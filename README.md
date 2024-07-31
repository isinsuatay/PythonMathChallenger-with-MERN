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
## Circle Server/.env 

REACT_APP_CIRCLE_API_KEY=TEST_API_KEY:3c515d2a8f2a72d539c9de1592f14198:7f84fdc73d77b64d24f47919443a0fe0
REACT_APP_CIRCLE_USER_ID=6830f9cc-8a96-4171-ab28-5331d0ca5b0a
REACT_APP_CIRCLE_USER_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoTW9kZSI6IlBJTiIsImRldmVsb3BlckVudGl0eUVudmlyb25tZW50IjoiVEVTVCIsImVudGl0eUlkIjoiZjg3YmM1MTQtYjA5Zi00ZjA3LWE3NjEtOTFhY2I0MzAzYjNjIiwiZXhwIjoxNzIyMzQxOTU4LCJpYXQiOjE3MjIzMzgzNTgsImludGVybmFsVXNlcklkIjoiZGViZTBjYzctYjcxMC01YTVkLTk1YzEtMDBiMjBjMzgxYjg5IiwiaXNzIjoiaHR0cHM6Ly9wcm9ncmFtbWFibGUtd2FsbGV0LmNpcmNsZS5jb20iLCJqdGkiOiJmMzRjNjQ2OC1jOTE0LTQxNzgtOGJjNy03OTUwNmE3ZTNiYTgiLCJzdWIiOiI2ODMwZjljYy04YTk2LTQxNzEtYWIyOC01MzMxZDBjYTViMGEifQ.jfaVmC1QH5uaCKFs-PxM8GRiTInqrPy_oBQKof5dadHl81O2CzoIHPpPhORcMvs78iJ5aSjrJgDX56AnJiqIleYfrPY6UBsNd_T4TGOBUjYUClDZ8mLhXzWaxSgjg9v-r5q66nTmRXLcizA5hM2fp_kc_M_ZBfmv-WV1AZJf4TnhfYZd7in1ORoaQfS1e6DYS_DNOs6qMeGOcBaJ-1xdFCxzDCj82Z0mBr95R2soqSCk12fmXaWtyl4XKguCKhKadniXIfryf2UPf1AEwhb56ReusoxyBW3C7RZ0cwDRbJ8eHIUzbNEjWytMNK6h4sWIARboAbk_ADhU3VhQ0qvNlw
REACT_APP_CIRCLE_ENCRYPTION_KEY=sXaBVn3TLfk7gB8jBmCN2CC70RSvnzwAJGVS+cVX1Ts=
REACT_APP_CIRCLE_CHALLENGE_ID=03d427e7-09c6-5bb3-8e90-11b33f27d49f
REACT_APP_CIRCLE_APP_ID=c21a1da9-2155-5088-9771-422db2eba6bb
REACT_APP_CIRCLE_WALLET_ID=d8447311-f90b-5087-9149-c2022aa78544
REACT_APP_CIRCLE_WALLET_ADRESS=0x1ce20fb4eaf3db3becdc9b9168e4d1ba71875c6a
idempotencyKey=68b7ff91-b403-4c8d-b687-ae833988f642

## Contact

For any questions or feedback, please open an issue or contact the project maintainer.

---

Enjoy challenging yourself with PythonMathChallenger!
