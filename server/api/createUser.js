import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const REACT_APP_CIRCLE_API_KEY = process.env.REACT_APP_CIRCLE_API_KEY;

export const createUser = async (req, res) => {
  const userId = uuidv4();

  const options = {
    method: 'POST',
    url: "https://api.circle.com/v1/w3s/users",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${REACT_APP_CIRCLE_API_KEY}`,
    },
    data: { userId: userId },
  };

  try {
    const response = await axios.request(options);
    console.log("User ID:", userId);
    console.log("Status:", response.status);

    if (response.status === 201) {
      console.log("User created successfully!");
      res.status(201).json({ userId, status: response.status });
    } else {
      console.error("User creation failed. Status:", response.status);
      res.status(response.status).json({ error: "User creation failed." });
    }
  } catch (error) {
    console.error("Error creating user:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};