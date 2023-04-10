const dbServer = {
  host: '127.0.0.1',
  port: '3306',
  user: 'remote',
  password: 'make-it-all',
  database: 'store',
};

const tunnelConfig = {
  host: "34.70.95.233",
  port: 22,
  username: "p_d_wild_21",
  privateKey:  require('fs').readFileSync('reactServer')
}
//src\pages\api\db.js
//reactServer
const forwardConfig = {
  srcHost: '127.0.0.1', // any valid address
  srcPort: 3306, // any valid port
  dstHost: dbServer.host, // destination database
  dstPort: dbServer.port // destination port
};

// dbConfig.js
const mysql = require('mysql2');
const { Client } = require('ssh2');
// create an instance of SSH Client
const sshClient = new Client();

const SSHConnection = new Promise((resolve, reject) => {

  sshClient.on('ready', () => {
    sshClient.forwardOut(
    forwardConfig.srcHost,
    forwardConfig.srcPort,
    forwardConfig.dstHost,
    forwardConfig.dstPort,
    (err, stream) => {
      if (err) {
        reject(err);}

            // create a new DB server object including stream
            const updatedDbServer = {
                 ...dbServer,
                 stream
            };
            
            // connect to mysql
            const connection =  mysql.createConnection(updatedDbServer);
            // check for successful connection
            //  resolve or reject the Promise accordingly          
            connection.connect((error) => {
              if (error) {
                reject(error);
              }
              resolve(connection);
            });
          });
  }).connect(tunnelConfig);
});

function executeQuery(sql) {
  SSHConnection.then((connection) => {
    connection.query(sql, function (err, result) {
      if (err) console.log(err);
      console.log(result);
      return result;
    });
  }).catch((error) => {
    console.error(error);
  });
};

export default executeQuery;