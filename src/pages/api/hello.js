// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

function createConnection() {
  $servername = "127.0.0.1:3306";
  $username = "remote";
  $password = "make-it-all";
  $dbname = "store";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  //if ($conn->connect_error) {
  //  die("Connection failed: " . $conn->connect_error);
  //}

  return $conn;
}

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
