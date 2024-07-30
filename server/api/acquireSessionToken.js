import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const REACT_APP_CIRCLE_API_KEY = process.env.REACT_APP_CIRCLE_API_KEY;
const REACT_APP_CIRCLE_USER_ID = process.env.REACT_APP_CIRCLE_USER_ID;

export const acquireSessionToken = async (req, res) => {
  const options = {
    method: 'POST',
    url: "https://api.circle.com/v1/w3s/users/token",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${REACT_APP_CIRCLE_API_KEY}`,
    },
    data: { userId: REACT_APP_CIRCLE_USER_ID },
  };

  try {
    const response = await axios.request(options);
    console.log("User token:", response.data.data.userToken);
    console.log("Encryption key:", response.data.data.encryptionKey);
    res.status(200).json({
      userToken: response.data.data.userToken,
      encryptionKey: response.data.data.encryptionKey,
    });
  } catch (error) {
    console.error("Error acquiring session token:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};