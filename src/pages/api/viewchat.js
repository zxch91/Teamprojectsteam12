import executeQuery from "./db.js"
const mysql = require('mysql2');

export default async function handler(req, res) {
  switch(req.method) {
    case "GET":
      //* GET to retrieve a resource
      const sqlGet = "SELECT group_name, group_id FROM store.Chat_Group"
      
      const resultGet = await executeQuery(sqlGet)
      console.log(typeof resultGet)
      res.status(200).json({ result: resultGet })
      break;

      default:
      console.log("Please enter a valid method")
      return "Failed"
  }
}