import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

console.log("Loaded ENV:", {
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  PORT: process.env.PORT,
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
