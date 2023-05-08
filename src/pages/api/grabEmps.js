import executeQuery from "./db.js"
const mysql = require('mysql2');

export default async function handler(req, res) {
  switch(req.method) {
    case "GET":
        //* GET to retrieve a resource
        let sqlGet = "select u.user_id, u.username, u.email from `User` u where u.user_id in (select t.assigned_to from `Tasks` t where t.project_id = ?)"
        
        sqlGet = mysql.format(sqlGet, [req.query["projects_id"]]);
        const resultGet = await executeQuery(sqlGet)
        res.status(200).json({ result: resultGet })
        break;
      
    default:
      console.log("Please enter a valid method")
      return "Failed"
  }
}