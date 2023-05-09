import executeQuery from "./db.js"
const mysql = require('mysql2');

export default async function handler(req, res) {
  switch(req.method) {
    case "GET":
        //* GET to retrieve a resource
        let user_id = parseInt(req.query["user_id"]);

        var sqlGet = "select p.project_name, p.project_id from `Projects` p where p.project_id in (select f.project_id from `Project_Assignment` f where f.user_id = ?);"
        
        sqlGet = mysql.format(sqlGet, [user_id]);
        const resultGet = await executeQuery(sqlGet)
        res.status(200).json({ result: resultGet })
        break;
      
    default:
      console.log("Please enter a valid method")
      return "Failed"
  }
}