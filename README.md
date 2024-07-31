# PythonMathChallenger-with-MERN

## Overview

PythonMathChallenger is a web application designed to challenge users with various math problems. The application is built using the MERN stack (MongoDB, Express, React, Node.js) with Python integrated for generating and evaluating math problems.

![App Screenshot](./project-image/image-1.png)
![App Screenshot](./project-image/image-2.png)
![App Screenshot](./project-image/image-3.png)

## Features

- **Math Challenges:** A variety of math problems generated dynamically.
- **Leaderboard:** Tracks top performers.
- **Responsive Design:** Optimized for both desktop and mobile use.
- **Wallet creation and transaction management with Circle


## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - Vite
  - Node.js
  - Express
  - Python
  - MongoDB
	- Circle API

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/isinsuatay/PythonMathChallenger-with-MERN.git
    cd PythonMathChallenger-with-MERN
    ```

2. **Install dependencies for the server:**
    ```bash
    cd server
    npm install
    ```

3. **Set up environment variables:**
   Create a `.env` file in the `server` directory and add the necessary environment variables (e.g., database connection string, secret keys).

4. **Run the development server:**
    ```bash
    cd server
    node server.js
    ```

5. **Run the client:**
    ```bash
    npm install
    npm run dev
    ```

## Circle Network Integration

This project integrates Circle’s API for handling wallet creation and transactions. Upon user login, a wallet is created, and subsequent user details are securely stored. This integration allows for the secure distribution of rewards based on correct answers.

Setup

	1.	Environment Variables:
	•	Ensure the .env file includes keys for Circle API integration.
	•	CIRCLE_API_KEY: Your Circle API key.
	•	CIRCLE_BASE_URL: Base URL for the Circle API.
	2.	Backend Modifications:
	•	/server/api/createUser.js: Handles user and wallet creation.
	•	Added routes for initiating and managing transactions.
	3.	Frontend Changes:
	•	src/components/WalletButton.tsx: Button for wallet creation and displaying wallet information.

## Usage


 **Start a Challenge:**
   - Begin solving math problems and improve your skills.

	1.	Creating a Wallet:
	•	Users can create a wallet by clicking the “Create Wallet” button after logging in.
	2.	Managing Transactions:
	•	The backend processes transactions and updates the frontend with real-time data.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code adheres to the project's coding standards and includes relevant tests.


## Contact

For any questions or feedback, please open an issue or contact the project maintainer.

---

Enjoy challenging yourself with PythonMathChallenger!
