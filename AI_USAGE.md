# AI Usage Declaration

This document transparently outlines how AI assistance was used during the development of the **Consultation Recording Manager** project.

## How AI Was Used

1. **Architectural Planning**
   AI was used to plan the overall MERN stack architecture — deciding on a modular folder structure (`models/`, `controllers/`, `routes/`, `middleware/`) for the backend, and a component/page-based structure for the React frontend.

2. **Boilerplate & Code Generation**
   AI generated initial boilerplate code for:
   - Express server setup and MongoDB connection
   - Mongoose schema definition for recordings
   - Multer configuration for audio file uploads
   - REST API controllers and routes (CRUD operations)
   - React components (Dashboard, Upload form, Recordings table)
   - Tailwind CSS styling for a clean, responsive UI

3. **Code Optimization**
   AI suggestions were used to:
   - Implement clean error handling in controllers
   - Add search/filter logic (both server-side via query params and client-side filtering)
   - Structure reusable components (e.g., `RecordingsTable`, `Layout`)

4. **Documentation**
   AI helped draft this `AI_USAGE.md` and the project `README.md`, including the API reference table and setup instructions.

## Developer Involvement

- All AI-generated code was **manually reviewed, tested, and understood** before integration.
- The developer verified that endpoints work correctly with the database, that file uploads/deletes work on the filesystem, and that the frontend correctly communicates with the backend via Axios.
- Any errors encountered during integration (e.g., CORS issues, file path handling, status toggling logic) were debugged and fixed by the developer.
- The developer is able to explain every part of the codebase, including the schema design, API design, and component logic.

## Summary

AI was used as a **productivity and learning tool** to accelerate development and reduce boilerplate writing time, similar to using a senior developer as a pair-programming partner. The final implementation, testing, and understanding of the system remain the responsibility of the developer.
