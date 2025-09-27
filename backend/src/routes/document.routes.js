import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.js";
import {
  getSignedUrl,
  saveFileMetadata,
  listDocuments,
  uploadDocument,
  deleteDocument
} from "../controllers/document.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/presign", getSignedUrl);
router.post("/metadata", saveFileMetadata);
router.post("/upload", upload.single('file'), uploadDocument);
router.get("/", listDocuments);
router.delete("/delete/:filekey", deleteDocument);


export default router;