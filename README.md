# School Management API

A complete backend project designed to manage school information. It allows for adding new schools and fetching a list of schools sorted by proximity to a given user's location.

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MySQL**: Relational database
- **mysql2**: Promise-based MySQL client for Node.js
- **Joi**: Object schema validation

## Prerequisites

- Node.js installed
- MySQL Server running

## MySQL Database Setup

Connect to your MySQL database and run the following queries to create the database and table:

```sql
CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

## Installation

1. Clone or download this project.
2. Navigate to the project directory:
   ```bash
   cd "School Management"
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory (already included if testing locally) or set up your environment variables as follows:

```
PORT=5000
DB_HOST=mysql-xxxxxxxx-your-aiven-project.aivencloud.com
DB_PORT=24675
DB_USER=avnadmin
DB_PASSWORD=your_aiven_password
DB_NAME=defaultdb
DB_SSL=true
```

> Note: The project is currently configured to connect securely to an **Aiven MySQL** service. Make sure your local network allows outbound connections to the provided port, and that your IP address is allowed in your Aiven service settings.

## Running the Project

Start the application using:
```bash
npm start
```
The server will be running normally on `http://localhost:5000`.

To run in development mode (auto-refresh with `--watch`):
```bash
npm run dev
```

## API Documentation

**Live Postman Documentation**: [View Postman Docs](https://documenter.getpostman.com/view/37563529/2sBXqDs2ux)

**Deployed API Base URL (Render)**: `[Insert Render URL here later]`

### 1. Add School API
- **Description**: Adds a new school to the database. Validates all inputs including geographical bounds.
- **Method**: POST
- **URL**: `http://localhost:5000/addSchool`

**Request Body (JSON):**
```json
{
    "name": "Springfield High School",
    "address": "1234 Elm Street, Springfield",
    "latitude": 39.7817,
    "longitude": -89.6501
}
```

**Sample Response (Success):**
```json
{
    "success": true,
    "message": "School added successfully",
    "data": {
        "id": 1,
        "name": "Springfield High School",
        "address": "1234 Elm Street, Springfield",
        "latitude": 39.7817,
        "longitude": -89.6501
    }
}
```

### 2. List Schools API
- **Description**: Retrieves a list of all schools, sorted by distance from the user's provided coordinates.
- **Method**: GET
- **URL**: `http://localhost:5000/listSchools?latitude=39.78&longitude=-89.65`

**Query Parameters:**
- `latitude` (Float, required): User's latitude
- `longitude` (Float, required): User's longitude

**Sample Request URL:**
```
http://localhost:5000/listSchools?latitude=39.78&longitude=-89.65
```

**Sample Response (Success):**
```json
{
    "success": true,
    "message": "Schools fetched successfully",
    "data": [
        {
            "id": 1,
            "name": "Springfield High School",
            "address": "1234 Elm Street, Springfield",
            "latitude": 39.7817,
            "longitude": -89.6501,
            "distance": 0.189456
        }
    ]
}
```

## Testing with Postman

1. A Postman collection export has been included in the root directory: `SchoolManagement.postman_collection.json`.
2. Open Postman.
3. Click "Import" in the top left corner.
4. Select the `.json` file and import the collection.
5. All endpoints along with example request bodies and parameters are preset for easy testing.

## Deployment Instructions (Render / Railway)

1. **Database setup**: Host your MySQL database on a service like Aiven, PlanetScale, or a custom VPS.
2. **Environment variables**: Go to the settings in Render or Railway and add your environment variables matching your production database details (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`). Render will supply its own `PORT` variable.
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. Ensure `package.json` main property references `index.js` or the start script invokes it accurately. No other configuration is typically required.
