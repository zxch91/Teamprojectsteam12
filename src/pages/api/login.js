import executeQuery from "./db.js";
const mysql = require("mysql2");

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed. Use POST'});
  }

  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  // Query the database
  const sqlQuery = "SELECT * FROM `User` WHERE username = ? AND password = ?;";
  const formattedQuery = mysql.format(sqlQuery, [username, password]);
  console.log(formattedQuery);

  try {
    const result = await executeQuery(formattedQuery);
    console.log(result);
    if (result.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
