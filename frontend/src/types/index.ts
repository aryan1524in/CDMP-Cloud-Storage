export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  url: string;
}

export interface User {
  name: string;
  email: string;
  isVerified: boolean;
}