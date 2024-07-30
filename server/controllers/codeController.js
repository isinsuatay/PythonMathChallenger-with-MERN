import { exec } from 'child_process';
import fs from 'fs';

export const runCode = async (req, res) => {
  const { code, input } = req.body;

  const fileName = 'temp.py';
  const codePath = `./${fileName}`;

  fs.writeFileSync(codePath, code);

  const command = `python3 ${codePath}`; 
  const child = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ output: stderr });
    }
    return res.status(200).json({ output: stdout, error: stderr }); 
  });

  if (input) {
    child.stdin.write(input);
    child.stdin.end();
  }
};
