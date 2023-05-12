import executeQuery from "./db.js";
const mysql = require('mysql2');

export default async function handler(req, res) {
  switch(req.method) {
    case "GET":
      // extract user_id from request query parameters
      const { user_id } = req.query;

      // If user_id is not provided, return an error
      if (!user_id) {
        res.status(400).json({ error: 'user_id is required' });
        return;
      }

      // Validate that user_id is a number
      if (isNaN(user_id)) {
        res.status(400).json({ error: 'user_id must be a number' });
        return;
      }

      // SQL query to select groups where the user_id is a member and latest message in each group
      const sqlGet = `
        SELECT cg.group_name, cg.group_id, m.content as latest_message
        FROM store.Chat_Group as cg
        JOIN store.Group_Member as gm ON cg.group_id = gm.group_id
        LEFT JOIN (
          SELECT content, group_id
          FROM store.Message
          WHERE (group_id, sent_at) IN (
            SELECT group_id, MAX(sent_at)
            FROM store.Message
            GROUP BY group_id
          )
        ) as m ON cg.group_id = m.group_id
        WHERE gm.user_id = ${user_id};
      `;

      // Execute the query
      const resultGet = await executeQuery(sqlGet);
      console.log(resultGet);

      res.status(200).json({ result: resultGet });
      break;

    default:
      console.log("Please enter a valid method");
      res.status(405).json({ error: "Invalid request method" });
  }
}
