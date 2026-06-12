# 🔮 Consultation Recording Manager

A full-stack MERN application that helps astrologers (or any consultants) manage audio recordings of their consultations — upload, search, play back, annotate with notes, and track review status.

---

## 📌 Project Overview

Astrologers conduct audio consultations with clients regularly. This system provides a centralized way to:

- Upload and store consultation audio recordings
- Tag each recording with a title and client name
- Search through past recordings instantly
- Play recordings directly in the browser
- Add and edit notes per recording
- Track the review status of each recording (`Pending`, `Reviewed`, `Completed`)

---

## 🛠 Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer (file uploads)
- CORS, dotenv

**Frontend**
- React (Vite)
- React Router DOM
- Tailwind CSS
- Axios

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection string
- npm

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone <https://github.com/SAWAN098/Consultation-Audio-Manager.git>
cd consultation-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder (already included as a template):

```
MONGO_URI=mongodb://localhost:27017/consultation_manager
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The backend runs at `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

---

## 🔗 API Endpoints

| Method | Endpoint              | Description                              |
|--------|-----------------------|-------------------------------------------|
| POST   | `/api/recordings`     | Upload a new recording (audio + metadata) |
| GET    | `/api/recordings`     | Get all recordings (supports `?search=`)  |
| GET    | `/api/recordings/:id` | Get a single recording by ID              |
| PUT    | `/api/recordings/:id` | Update notes / status / title / client    |
| DELETE | `/api/recordings/:id` | Delete a recording (DB entry + audio file)|

### Recording Schema

```json
{
  "title": "String",
  "clientName": "String",
  "fileUrl": "String",
  "notes": "String",
  "status": "Pending | Reviewed | Completed",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 📁 Project Structure

```
consultation-manager/
├── backend/
│   ├── server.js
│   ├── .env
│   ├── models/Recording.js
│   ├── middleware/upload.js
│   ├── controllers/recordingController.js
│   ├── routes/recordingRoutes.js
│   └── uploads/
└── frontend/
    ├── src/
    │   ├── api/api.js
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   └── RecordingsTable.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   └── Upload.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── index.html
```

---

## 🔮 Future Scope

1. **AI Transcription** — Automatically transcribe audio recordings using OpenAI Whisper API, making consultations searchable by spoken content.
2. **Role-Based Access** — Add authentication so multiple astrologers/admins can manage their own recordings securely.
3. **Cloud Storage Integration** — Move audio storage from local disk to AWS S3 / Cloudinary for scalability and reliability.

---

## 📄 License

This project was created for educational/academic purposes.
