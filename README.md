# tc-backend

A RESTful API for managing teachers and classes with PostgreSQL database, built with Express.js and TypeScript.

---

## Features

- **Teachers Management**
    - Create new teachers
    - List all teachers
- **Classes Management**
    - Create new classes (requires existing teacher)
    - List all classes with teacher information
- **Data Validation**
    - Maximum 40 teachers limit (to prevent abuse if the API is publicly available)
    - Maximum 40 classes limit (to prevent abuse if the API is publicly available)
    - Teacher must exist before creating class
---
## Technologies Used
- **Node.js**: JavaScript runtime for building the API
- **Express.js**: Web framework for Node.js
- **TypeScript**: Superset of JavaScript for type safety
- **PostgreSQL**: Relational database for data storage
---

## Getting Started
### Clone the repository
```bash
git clone git@github.com:josiahphua/tc-backend.git
cd tc-backend
```

### Docker Compose
Build and run the application with PostgreSQL in a Docker container
```bash
docker-compose up -d --build
```

Install dependencies
```bash
npm install
```
Create a `.env` file in the root directory from `.env.sameple`
```bash
cp .env.sample .env
```
Set up PostgreSQL database
```bash
# Create a new database in PostgreSQL
createdb school
```
Run the application
```bash
npm run dev
```
The API will be available at `http://localhost:3001`.

## API Endpoints
### Teachers
- `POST /api/teachers`: Create a new teacher
- `GET /api/teachers`: Get all teachers

### Classes
- `POST /api/classes`: Create a new class (requires existing teacher)
- `GET /api/classes`: Get all classes with teacher information

## Testing
### Unit Tests
Run unit tests using Jest
```bash
npm run test
```
### Formatting
Run Prettier to format the code
```bash
npm run format
```

---
