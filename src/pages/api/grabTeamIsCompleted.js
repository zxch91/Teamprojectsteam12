import executeQuery from "./db.js"
const mysql = require('mysql2');

export default async function handler(req, res) {
  switch(req.method) {
    case "GET":
        //* GET to retrieve a resource
        let project_id = parseInt(req.query["selected_project_id"]);
        let isCompleted = parseInt(req.query["comp"]);

        let sqlGet = "select count(t.task_id) as num from `Tasks` t where t.is_completed = ? and t.project_id = ? LIMIT 0,100";
        sqlGet = mysql.format(sqlGet, [isCompleted, project_id]);
        const resultGet = await executeQuery(sqlGet)
        res.status(200).json({ result: resultGet })

        break;
      
    default:
      console.log("Please enter a valid method")
      return "Failed"
  }
}