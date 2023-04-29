import executeQuery from "./db.js";
const mysql = require("mysql2");

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      //* GET to retrieve a resource
      const sqlGet = "SELECT username, user_id FROM store.User";

      const resultGet = await executeQuery(sqlGet);
      console.log(typeof resultGet);
      res.status(200).json({ result: resultGet });
      break;

    case "POST":
      //* POST to create a resource

      var sqlPost =
        "INSERT INTO store.Chat_Group \
        (group_name, group_description, created_by, created_at)\
        VALUES (?, ?, ?, ?);";

      const membersPost = req.body["chatMembers"];
      const namePost = req.body["chatName"];
      const descriptionPost = req.body["description"];
      const createdAtPost = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const insertPost = [namePost, descriptionPost, "1", createdAtPost]; // change the createdby field when server sided login is added
      sqlPost = mysql.format(sqlPost, insertPost);

      const resultPost = await executeQuery(sqlPost);

      const chatGroupId = resultPost.insertId;

      for (const member of membersPost) {
        const sqlInsertMember =
          "INSERT INTO store.Group_Member \
        (group_id, user_id, is_admin)\
        VALUES (?, ?, ?);";

        const insertMember = [chatGroupId, member, 0]; 
        const formattedInsertMember = mysql.format(
          sqlInsertMember,
          insertMember
        );

        await executeQuery(formattedInsertMember);
      }

      res.status(200).json({ result: resultPost });
      break;

    case "PUT":
      //* PUT to change the state of or update a resource, which can be an object, file or block
      var sqlPut = "UPDATE store.User SET email = ? WHERE user_id = ?";

      const emailPut = req.body["email"];
      const userIdPut = req.body["userId"];

      const insertPut = [emailPut, userIdPut];
      sqlPut = mysql.format(sqlPut, insertPut);

      const resultPut = await executeQuery(sqlPut);
      res.status(200).json({ result: resultPut });
      break;

    case "DELETE":
      //* DELETE to remove it
      var sqlDelete = "DELETE FROM store.User WHERE user_id = ?";

      const userIdDelete = req.body["userId"];

      const insertDelete = [userIdDelete];
      sqlDelete = mysql.format(sqlDelete, insertDelete);

      const resultDelete = await executeQuery(sqlDelete);
      res.status(200).json({ result: resultDelete });
      break;

    default:
      console.log("Please enter a valid method");
      return "Failed";
  }
}
