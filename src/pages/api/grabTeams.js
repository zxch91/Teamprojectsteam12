import executeQuery from "./db.js"
const mysql = require('mysql2');

export default async function handler(req, res) {
  switch(req.method) {
    case "GET":
        //* GET to retrieve a resource
        const sqlGet = "select p.project_name, p.project_id from `Projects` p;"
        
        const resultGet = await executeQuery(sqlGet)
        res.status(200).json({ result: resultGet })
        break;
      
    default:
      console.log("Please enter a valid method")
      return "Failed"
  }
}