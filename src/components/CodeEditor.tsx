import  { useState, forwardRef, useImperativeHandle } from 'react';
import Editor from "@monaco-editor/react";
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBroom } from '@fortawesome/free-solid-svg-icons';
import '../styles/CodeEditor.css';

const CodeEditor = forwardRef((_, ref) => {
  const [userCode, setUserCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [userOutput, setUserOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  const api = Axios.create({ baseURL: 'http://localhost:8000' });

  useImperativeHandle(ref, () => ({
    resetEditor() {
      setUserCode('');
      setUserInput('');
      setUserOutput('');
    }
  }));

  const compile = () => {
    api.post('/run-code', {
      code: userCode,
      input: userInput
    }).then((res) => {
      setUserOutput(res.data.output);
      setCopied(false);
    }).catch((error) => {
      setUserOutput(error.response.data.output);
      setCopied(false);
      console.error('Error compiling code:', error);
    });
  };

  const clearOutput = () => {
    setUserOutput('');
    setCopied(false);
  };

  return (
    <div className="codeEditor">
      <div className="main">
        <div className="upside">
          <Editor
            theme="vs-dark"
            defaultLanguage="python"
            defaultValue="# Enter your code here"
            value={userCode}
            onChange={(value) => setUserCode(value || '')}
            options={{
              fontSize: fontSize,
              minimap: { enabled: false },
              wordWrap: 'on'
            }}
          />
        </div>
        <div className="btnContainer">
          <button className='btn' style={{ marginBottom: '30px' }} onClick={compile}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button className='btn' onClick={clearOutput}>
            <FontAwesomeIcon icon={faBroom} />
          </button>
          <input
            type="range"
            min={12}
            max={30}
            value={fontSize}
            step={2}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />

        </div>
        <div className="down">
          <h4>Input:</h4>
          <div className="input-box">
            <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} />
          </div>
          <h4>Output:</h4>
          <div className="output-box">
            <pre>{userOutput}</pre>
            {copied && <span className="copied-text">Copied!</span>}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CodeEditor;
