import executeQuery from "./db.js"

const sql = "SELECT * FROM store.User"
const sql1 = "INSERT INTO store.User (user_id,username,email,password,created_at,user_type) VALUES(2,'Joe','joe@make-it-all.co.uk','something','2023-04-10 20:40:42','''user''');"
const result = executeQuery(sql)

export default function handler(req, res) {
  res.status(200).json({ result: result })
}