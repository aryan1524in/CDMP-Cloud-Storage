import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME
} from "../config.js";

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});

export const generateUploadUrl = async (fileName, contentType) => {
  const key = `uploads/${uuidv4()}-${fileName.replace(/\s+/g, "_")}`;

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  return { uploadUrl, key };
};

export const uploadToS3 = async ({ fileBuffer, fileName, contentType }) => {
  const key = `${Date.now()}_${fileName.replace(/\s+/g, "_")}`;
  const filePath = `uploads/${key}`

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: filePath,
    Body: fileBuffer,
    ContentType: contentType
  });

  await s3Client.send(command);
  return { Key: key };
};

export const deleteFromS3 = async (key) => {
  const filePath = key;
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filePath
  });

  await s3Client.send(command);
};