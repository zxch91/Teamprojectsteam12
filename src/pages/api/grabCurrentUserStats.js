import executeQuery from "./db.js"
const mysql = require('mysql2');

export default async function handler(req, res) {
  switch(req.method) {
    case "GET":
        //* GET to retrieve a resource
        //replace "###" with SESSION
        let assignedTo = parseInt(req.query["user_id"]);
        let isCompleted = parseInt(req.query["comp"]);

        let sqlGet = "select count(task_id) as 'num' from `Tasks` where assigned_to = ? and is_completed = ?;";
        sqlGet = mysql.format(sqlGet, [assignedTo, isCompleted]);
        console.log(sqlGet);
        const resultGet = await executeQuery(sqlGet)
        res.status(200).json({ result: resultGet })

        break;
      
    default:
      console.log("Please enter a valid method")
      return "Failed"
  }
}