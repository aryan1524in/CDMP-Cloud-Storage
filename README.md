# 🗄️ BluDocs - Document Management System

A scalable, secure, and cloud-native document management solution for uploading, storing, searching, and managing user documents.

---

## 📜 System Architecture Diagram

<!-- Replace with actual path if hosted -->

![System Architecture Diagram](https://github.com/user-attachments/assets/70f7bb73-896b-4b70-adc1-80d61fb590db)

---

## 🔍 Overview

**SkySync** provides a seamless platform where users can:

- **Register and authenticate securely**
- **Upload and download documents using pre-signed URLs**
- **Search for documents using custom metadata**
- **View document history and metadata**

---

## 🏗️ Architecture

### Frontend

- **React.js (via AWS Amplify):** Responsive, modern UI
- **CI/CD Enabled:** Automatic deployment via GitHub integration

### Backend

- **Node.js + Express:** REST API handling auth, uploads, metadata, and search
- **Amazon Cognito:** User sign-up, login, and JWT-based authentication
- **Amazon S3:** Secure file storage via pre-signed URLs
- **Amazon DynamoDB:** NoSQL metadata store with indexed search
- **Amazon CloudWatch:** Centralized logging and performance monitoring

---

## 🚀 Deployment

### Frontend Deployment

- Deployed using AWS Amplify
- Connected to a GitHub repo for automatic deployments on push to `main`

### Backend Deployment

- Node.js app hosted on EC2
- Secure tunnel provided by Cloudflare Tunnel
- CI/CD pipeline set up for automatic deployment on code updates

---

## 🛣️ API Overview

| Endpoint                                | Method | Description                                                                |
|------------------------------------------|--------|----------------------------------------------------------------------------|
| `/api/auth/login`                       | POST   | User login via Cognito                                                      |
| `/api/auth/signup`                      | POST   | User registration                                                           |
| `/api/auth/confirm`                     | POST   | Confirm user authentication                                                 |
| `/api/documents/metadata`               | POST   | Upload document metadata                                                    |
| `/api/documents`                        | POST   | Upload a document file (requires pre-signed URL, see below)                 |
| `/api/documents`                        | GET    | Fetch all user documents                                                    |
| `/api/documents/presign`                | POST   | Generate S3 pre-signed URL for upload                                       |
| `/api/documents/delete?key=<file_key>`  | DELETE | Delete a document from S3 and DynamoDB by key                               |
| `/api/documents/upload`                 | PUT    | Upload a document file directly to S3 using the pre-signed URL              |

## 🛣️ API Endpoints Examples

### 1. User Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "yourpassword"
}
```

---

### 2. User Signup

```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "yourpassword",
  "email": "user@example.com"
}
```

---

### 3. Confirm User Authentication

```http
POST /api/auth/confirm
Content-Type: application/json

{
  "username": "user@example.com",
  "code": "123456"  // Code received via email or SMS
}
```

---

### 4. Upload Document Metadata

```http
POST /api/documents/metadata
Content-Type: application/json

{
  "title": "Project Report",
  "description": "Quarterly project report",
  "tags": ["Q2", "report", "project"],
  "key": "uploads/abc123-report.pdf"
}
```

---

### 5. Fetch All User Documents

```http
GET /api/documents
```

---

### 6. Generate S3 Pre-signed URL for Upload

```http
POST /api/documents/presign
Content-Type: application/json

{
  "filename": "example.pdf",
  "contentType": "application/pdf"
}
```

**Sample Response:**
```json
{
  "url": "https://your-bucket.s3.amazonaws.com/uploads/abc123-example.pdf?AWSAccessKeyId=...",
  "key": "uploads/abc123-example.pdf"
}
```

---

### 7. Upload Document File to S3 (Using Pre-signed URL)

```bash
curl -X PUT "https://your-bucket.s3.amazonaws.com/uploads/abc123-example.pdf?AWSAccessKeyId=..." \
  -H "Content-Type: application/pdf" \
  --data-binary "@path/to/example.pdf"
```
> Replace `@path/to/example.pdf` with your file path and use the actual pre-signed URL.

---

### 8. Delete Document from S3 and DynamoDB

```http
DELETE /api/documents/delete?key=uploads/abc123-example.pdf
```
> Replace the `key` parameter value with the actual file key you want to delete.

---

## ✨ Key Features

- 🔐 **Secure Authentication:** Powered by AWS Cognito
- ☁️ **Cloud File Storage:** S3 with pre-signed URL access
- ⚡ **High Performance:** Fast metadata queries using DynamoDB
- 📊 **Monitoring:** Logs and metrics integrated with CloudWatch
- 🔍 **Searchable Metadata:** Custom attributes for efficient lookups
- 🚀 **CI/CD:** Automatic deployment via GitHub

---

## 🛠️ Tech Stack

| Layer        | Technology                                   |
|--------------|----------------------------------------------|
| Frontend     | React.js, AWS Amplify                        |
| Backend      | Node.js, Express.js                          |
| Auth         | AWS Cognito                                  |
| Storage      | Amazon S3                                    |
| Database     | Amazon DynamoDB                              |
| Monitoring   | Amazon CloudWatch                            |
| Deployment   | EC2, Cloudflare Tunnel, GitHub Actions       |

---

## 🤝 Contributing

1. **Fork** this repository
2. **Create** a feature branch
3. **Commit** your changes
4. **Push** to your fork
5. **Open** a Pull Request

We welcome contributions of all kinds — bug fixes, new features, documentation!

