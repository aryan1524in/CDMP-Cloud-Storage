import { generateUploadUrl } from "../services/s3.service.js";
import { saveMetadata, getDocumentsByUser } from "../services/dynamo.service.js";
import { deleteFromS3 } from "../services/s3.service.js";
import { deleteDocumentMetadata } from "../services/dynamo.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getSignedUrl = asyncHandler(async (req, res) => {
  const { fileName, contentType } = req.body;

  if (!fileName || !contentType) {
    return res.status(400).json({
      error: "Both fileName and contentType are required",
      received: { fileName, contentType }
    });
  }

  try {
    const { uploadUrl, key } = await generateUploadUrl(fileName, contentType);
    res.json({ uploadUrl, key });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
});

export const saveFileMetadata = asyncHandler(async (req, res) => {
  const { fileName, key, contentType } = req.body;
  const userId = req.user.sub;

  if (!fileName || !key || !contentType) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["fileName", "key", "contentType"]
    });
  }

  try {
    await saveMetadata({ fileName, key, contentType, userId });
    res.status(201).json({ message: "Metadata saved successfully" });
  } catch (error) {
    console.error("Error saving metadata:", error);
    res.status(500).json({ error: "Failed to save metadata" });
  }
});

export const listDocuments = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.sub;
    const documents = await getDocumentsByUser(userId);
    res.json(documents);
  } catch (error) {
    console.error("Error listing documents:", error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ 
      error: "No file uploaded",
      details: "Ensure you're using multipart/form-data with 'file' field"
    });
  }

  try {
    const { originalname, mimetype, size, buffer } = req.file;
    const userId = req.user.sub;

    // Upload to S3
    const s3Response = await uploadToS3({
      fileBuffer: buffer,
      fileName: originalname,
      contentType: mimetype
    });

    // Save metadata
    await saveMetadata({
      key: s3Response.Key,
      fileName: originalname,
      contentType: mimetype,
      userId
    });

    res.status(201).json({
      success: true,
      key: s3Response.Key,
      fileName: originalname,
      fileType: mimetype,
      fileSize: size
    });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ 
      error: "File upload failed",
      details: error.message 
    });
  }
});

const uploadToS3 = async ({ fileBuffer, fileName, contentType }) => {
  const key = `${Date.now()}_${fileName.replace(/\s+/g, "_")}`;
  const filePath = `uploads/${key}`
  
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filePath,
    Body: fileBuffer,
    ContentType: contentType
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return { Key: key };
};

export const deleteDocument = asyncHandler(async (req, res) => {
  console.log(req.params)
  const key = req.params.filekey;     // get key from query param
  const userId = req.user.sub;
  const filePath = `uploads/${key}`
  if (!key) {
    return res.status(400).json({ error: "Missing S3 key in request" });
  }

  console.log("Deleting key:", key);

  try {
    await deleteFromS3(filePath);
    await deleteDocumentMetadata(userId, filePath);
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Failed to delete document" });
  }
});




