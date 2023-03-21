const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '127.0.0.1:3306', 
     user:'remote', 
     password: 'make-it-all',
     database: 'store',
     connectionLimit: 5
});
async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	const res = await conn.query("INSERT INTO `User`(username,email,password,created_at,user_type) VALUES('Peter','peter@make-it-all.co.uk','a','2023-03-28 14:02:51','manager');");
	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}