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
  privateKey: require('fs').readFileSync('reactServer')
}

const forwardConfig = {
  srcHost: '127.0.0.1',
  srcPort: 3306,
  dstHost: dbServer.host,
  dstPort: dbServer.port
};

const mysql = require('mysql2');

async function executeQuery(sql) {
  try {
    let connection;
    if (dbServer.host === 'localhost' || dbServer.host === '127.0.0.1') {
      connection = mysql.createConnection(dbServer);
    } else {
      const { Client } = require('ssh2');
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
                reject(err);
              }
              const updatedDbServer = {
                ...dbServer,
                stream
              };
              const connection = mysql.createConnection(updatedDbServer);
              connection.connect((error) => {
                if (error) {
                  reject(error);
                }
                resolve(connection);
              });
            });
        }).connect(tunnelConfig);
      });
      connection = await SSHConnection;
    }
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    connection.end();
    return result;
  } catch (error) {
    return error;
  }
}

export default executeQuery;
