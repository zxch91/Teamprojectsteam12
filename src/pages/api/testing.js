import executeQuery from "./db.js"
const mysql = require('mysql2');

export default async function handler(req, res) {
  switch(req.method) {
    case "GET":
      //* GET to retrieve a resource
      const sqlGet = "SELECT * FROM store.User"
      
      const resultGet = await executeQuery(sqlGet)
      console.log(typeof resultGet)
      res.status(200).json({ result: resultGet })
      break;


    case "PUT":
      //* PUT to change the state of or update a resource, which can be an object, file or block
      var sqlPut = "UPDATE store.User SET email = ? WHERE user_id = ?"

      const emailPut = req.body['email'];
      const userIdPut = req.body['userId'];
      
      const insertPut = [emailPut, userIdPut];
      sqlPut = mysql.format(sqlPut,insertPut)

      const resultPut = await executeQuery(sqlPut)
      res.status(200).json({ result: resultPut })
      break;


    case "POST":
      //* POST to create a resource

      var sqlPost = "INSERT INTO store.User \
      (username, email, password, created_at, user_type)\
      VALUES (?, ?, ?, ?, ?);"
      
      const emailPost = req.body['email'];
      const usernamePost = req.body['username'];
      const passwordPost = req.body['password']
      const createdAtPost = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const userTypePost = req.body['userType']

      const insertPost = [usernamePost, emailPost, passwordPost, createdAtPost, userTypePost];
      sqlPost = mysql.format(sqlPost, insertPost);

      const resultPost = await executeQuery(sqlPost)
      res.status(200).json({ result: resultPost })

      break;


    case "DELETE":
      //* DELETE to remove it
      var sqlDelete = 'DELETE FROM store.User WHERE user_id = ?';

      const userIdDelete = req.body['userId'];

      const insertDelete = [userIdDelete];
      sqlDelete = mysql.format(sqlDelete, insertDelete);

      const resultDelete = await executeQuery(sqlDelete)
      res.status(200).json({ result: resultDelete })
      break;
    default:
      console.log("Please enter a valid method")
      return "Failed"
  }
}