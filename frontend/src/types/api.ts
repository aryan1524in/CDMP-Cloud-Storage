import axios from "axios";

// Use environment variable for baseURL; fallback to a default if needed
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://default-backend-url.com", 
});

export interface User {
  email: string;
  name: string;
  isVerified: boolean;
}

export interface Document {
  fileKey: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  userId: string;
  timestamp: string;
}

export default api;
