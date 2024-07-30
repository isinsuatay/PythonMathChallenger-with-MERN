import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WalletButton from '../app/WalletButton';

interface User {
  email: string;
  username: string;
}

const AccountScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId && token) {
          const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token, userId]);



  return (
    <div className="account-container">
      <h2>Account</h2>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
        </div>
      )}
      <WalletButton />
    </div>
  );
};

export default AccountScreen;
