import React, { useState, useCallback, useEffect } from 'react';
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk';
import '../styles/WalletButton.css';


const WalletButton: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [appId, setAppId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [challengeId, setChallengeId] = useState('');
  const [sdk, setSdk] = useState<W3SSdk | null>(null);

  useEffect(() => {
    setSdk(new W3SSdk());
  }, []);

  const onAppIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setAppId(e.target.value), []);
  const onUserTokenChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setUserToken(e.target.value), []);
  const onEncryptionKeyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEncryptionKey(e.target.value), []);
  const onChallengeIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setChallengeId(e.target.value), []);

  const handleSubmit = useCallback(() => {
    if (sdk) {
      console.log(`App ID: ${appId}`);
      console.log(`User Token: ${userToken}`);
      console.log(`Encryption Key: ${encryptionKey}`);

      sdk.setAppSettings({ appId });
      sdk.setAuthentication({ userToken, encryptionKey });

      sdk.execute(challengeId, (error, result) => {
        if (error) {
          console.log(`${error?.code?.toString() || 'Unknown code'}: ${error?.message ?? 'Error!'}`);
          return;
        }

        if (result) {
          console.log(`Challenge: ${result.type}`);
          console.log(`Status: ${result.status}`);

          if ('data' in result && result.data) {
            console.log(`Signature: ${result.data.signature}`);
          }
        }
      });
    }
    setShowForm(false);
  }, [sdk, appId, userToken, encryptionKey, challengeId]);

  return (
    <div className="button-container">
      {!showForm ? (
        <button className="styled-button" onClick={() => setShowForm(true)}>Create Wallet</button>
      ) : (
        <div className="form-container">
          <input className="input" type="text" placeholder="App Id" value={appId} onChange={onAppIdChange} />
          <input className="input" type="text" placeholder="User Token" value={userToken} onChange={onUserTokenChange} />
          <input className="input" type="text" placeholder="Encryption Key" value={encryptionKey} onChange={onEncryptionKeyChange} />
          <input className="input" type="text" placeholder="Challenge ID" value={challengeId} onChange={onChallengeIdChange} />
<div className="bottom_button">
<button className="styled-button" onClick={handleSubmit}>Verify Challenge</button>
<button className="styled-button" onClick={() => setShowForm(false)}>Cancel</button>
</div>
        </div>
      )}
    </div>
  );
};

export default WalletButton;
