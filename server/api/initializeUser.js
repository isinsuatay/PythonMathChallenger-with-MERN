import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();
const REACT_APP_CIRCLE_API_KEY = process.env.REACT_APP_CIRCLE_API_KEY;
const REACT_APP_CIRCLE_USER_TOKEN = process.env.REACT_APP_CIRCLE_USER_TOKEN;

export const initializeUser = async (req, res) => {
  const idempotencyKey = req.body.idempotencyKey || uuidv4();

  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/user/initialize",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${REACT_APP_CIRCLE_API_KEY}`,
      "X-User-Token": REACT_APP_CIRCLE_USER_TOKEN,
    },
    data: { idempotencyKey, blockchains: ["MATIC-AMOY"] },
  };

  try {
    const response = await axios.request(options);
    console.log("idempotency key:", idempotencyKey);
    res.status(200).json({ challengeId: response.data.data.challengeId });
  } catch (error) {
    console.error('Error in API request:', error.response?.data || error.message);
    res.status(500).json({ error: 'An error occurred', details: error.response?.data || error.message });
  }
};