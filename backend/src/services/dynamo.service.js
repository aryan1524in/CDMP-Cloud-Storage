import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";  // note: from lib-dynamodb
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { unmarshall } from "@aws-sdk/util-dynamodb";

import {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  DYNAMO_TABLE_NAME,
  S3_BUCKET_NAME,
} from "../config.js";

// Initialize clients
const dynamoClient = new DynamoDBClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const saveMetadata = async ({ key, fileName, contentType, userId }) => {
  try {
    const headCommand = new HeadObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
    });

    const response = await s3Client.send(headCommand);
    const fileSize = response.ContentLength;

    const putCommand = new PutItemCommand({
      TableName: DYNAMO_TABLE_NAME,
      Item: {
        userId: { S: userId },
        timestamp: { S: Date.now().toString() },
        fileKey: { S: key },
        fileName: { S: fileName },
        fileSize: { N: fileSize.toString() },
        contentType: { S: contentType },
      },
    });

    await dynamoClient.send(putCommand);
    return { success: true };
  } catch (error) {
    console.error("Error in saveMetadata:", error);
    throw error;
  }
};

export const getDocumentsByUser = async (userId) => {
  try {
    const command = new QueryCommand({
      TableName: DYNAMO_TABLE_NAME,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: {
        ":uid": { S: userId },
      },
    });

    const result = await dynamoClient.send(command);
    return result.Items.map((item) => unmarshall(item));
  } catch (error) {
    console.error("Error in getDocumentsByUser:", error);
    throw error;
  }
};

export const deleteDocumentMetadata = async (userId, key) => {
  // Query for all documents of this user, then filter for matching fileKey
  const document = await dynamoClient.send(
    new QueryCommand({
      TableName: DYNAMO_TABLE_NAME,
      KeyConditionExpression: "userId = :uid",
      FilterExpression: "fileKey = :key",
      ExpressionAttributeValues: {
        ":uid": { S: userId },
        ":key": { S: key },
      },
    })
  );

  if (!document.Items?.length) {
    throw new Error("Document not found");
  }

  const timestamp = document.Items[0].timestamp.S;

  const command = new DeleteCommand({
    TableName: DYNAMO_TABLE_NAME,
    Key: {
      userId: userId,
      timestamp: timestamp,
    },
  });

  await dynamoClient.send(command);
};
