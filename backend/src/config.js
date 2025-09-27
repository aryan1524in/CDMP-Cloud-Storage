import dotenv from "dotenv";
dotenv.config();

const requiredVars = [
  "AWS_REGION",
  "S3_BUCKET_NAME",
  "DYNAMO_TABLE_NAME",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY"
];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const AWS_REGION = process.env.AWS_REGION;
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const DYNAMO_TABLE_NAME = process.env.DYNAMO_TABLE_NAME;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
