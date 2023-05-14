  const dbServer = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'store-it-all',
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

  async function executeQuery(sql) {
    try {
      const connection = await SSHConnection;
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
          if (err) reject(err);
          resolve(result);
        });
      });
      return result;
    } catch (error) {
      return error;
    }
  }


  export default executeQuery;