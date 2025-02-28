# PRODIGY_BD_02

## Overview
PRODIGY_BD_02 is a dynamic web-based application that leverages **MongoDB**, **Mongoose**, and **Express.js** for efficient backend operations. The project aims to fully migrate from a JSON-based database to MongoDB, improving scalability, performance, and reliability.

## Features
- **CRUD Operations**: Seamless Create, Read, Update, and Delete operations.
- **MongoDB Integration**: Uses Mongoose for structured and efficient database interactions.
- **RESTful API**: Well-structured API endpoints for smooth client-server communication.
- **User Authentication**: Secure login and session management.
- **Search & Filtering**: Optimized query execution for better data retrieval.
- **Efficient Data Handling**: Moving from JSON-based storage to MongoDB for better performance.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Version Control**: Git & GitHub

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- Git

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/aditya3singh/PRODIGY_BD_02.git
   cd PRODIGY_BD_02
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Setup environment variables:
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection string:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

4. Run the application:
   ```sh
   npm start
   ```

5. Open in browser:
   ```
   http://localhost:5000
   ```

## GitHub Authentication Fix
If you face authentication issues while pushing changes, use **Personal Access Token (PAT)** or **SSH authentication**:
```sh
git remote set-url origin https://<USERNAME>:<PERSONAL_ACCESS_TOKEN>@github.com/aditya3singh/PRODIGY_BD_02.git
```
Or, use SSH:
```sh
git remote set-url origin git@github.com:aditya3singh/PRODIGY_BD_02.git
```

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m "Your message"`).
4. Push to GitHub (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For queries, contact **Aditya Singh Gautam** via GitHub: [@aditya3singh](https://github.com/aditya3singh).

