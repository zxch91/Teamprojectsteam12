import executeQuery from "./db.js"
const mysql = require('mysql2');

export default async function handler(req, res) {
  switch(req.method) {
    case "GET":
      //* GET to retrieve a resource

      const group_id = req.query.group_id;

      console.log(req.query);

      console.log(group_id);

      var sqlGet = "SELECT * FROM store.Message where group_id = ?";


      sqlGet = mysql.format(sqlGet, [group_id]);

      console.log(sqlGet);
      
      const resultGet = await executeQuery(sqlGet)
      res.status(200).json({ result: resultGet })
      break;

      case "POST":
        //* POST to create a resource

        var sqlPost = "INSERT INTO store.Message \
        (sender_id, recipient_id, content, sent_at, group_id) \
        VALUES (?, ?, ?, ?, ?);"
        
        const senderId = req.body['senderId'];
        const recipientId = req.body['re']; // change this later
        const content = req.body['content']
        const sentAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const groupId = req.body['recipientId'];

        const insertPost = [senderId, recipientId, content, sentAt, groupId];
        sqlPost = mysql.format(sqlPost, insertPost);

        const resultPost = await executeQuery(sqlPost)
        res.status(200).json({ result: resultPost })
        break;
      
    // Don't need the funcionality to change anything in messages.
    // if I'm lying change this

    // Shouldn't be able to delete messages.
      
    default:
      console.log("Please enter a valid method")
      return "Failed"
  }
}