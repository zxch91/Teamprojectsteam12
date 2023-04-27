import {json} from 'micro';


export default async function handler (req, res) {
    console.log("Got a request")
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  console.log('Passed the NOT POST check');
  const username = req.body['username'];
  const password = req.body['password'];

  
    console.log('Received credentials:', { username, password });
  
    // Hard-coded credentials for testing purposes
    const validUsername = 'testuser';
    const validPassword = 'testpassword';
  
    if (username === validUsername && password === validPassword) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Invalid credentials:', { username, password });
      res.status(401).json({ message: 'Invalid username or password' });
    }
  }