const dotenv = require('dotenv');
dotenv.config();
const { MYSQL_URL, MYSQL_USER, MYSQL_PASS, MYSQL_DATABASE } = process.env;
const mysql = require('mysql'); // MySql DB module.

// MySQL connection and call.
const conn = mysql.createConnection({
    host: MYSQL_URL,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DATABASE,
    insecureAuth: true,
    port: 3306
});

// Enpoints calls functions.
module.exports = {
    // Sample data function.
    testConnection: async () => {
        try {

            let response = await(async () => {
                return new Promise((resolve, reject) => {
                    conn.connect((err) => {

                        if (!err) {
                            resolve('Database is connected!');
                        } else {
                            console.log('Database not connected! : ' + JSON.stringify(err, undefined, 2));
                            reject('Database not connected!');
                        }
                    });
                });
            })();

            return {
                result: response
            }

        } catch (error) { console.log(`WS Endpoint [testConnection] ${error.message}`); }
    },
    // Sample function to make a select query from DB.
    select: async ({values, table, where}) => {
        try {

            /*
                [POST] http://{server}/selectSample
                [JSON]
                {
                    "values": "*",
                    "table": "testing",
                    "where": ""
                }
            */

            let response = await (async () => {
                return new Promise((resolve, reject) => {
                    conn.connect((err) => {

                        if (!err) {
                            console.log('Database is connected!');
                            let query = ''
                            if ( where !== '' ) query = `SELECT ${values} FROM ${table} WHERE ${where}`;
                            else query = `SELECT ${values} FROM ${table}`;

                            conn.query(query, (err, rows) => {
                                if (!err) {
                                    if (rows.length > 0) resolve(JSON.parse(JSON.stringify( rows ) ));
                                    else resolve('No Exists');
                                } else {
                                    console.log(`Error MySQL => ${err.message}`);
                                    reject('Dont exists');
                                }
                            });

                        } else {
                            console.log('Database not connected! : ' + JSON.stringify(err, undefined, 2));
                            reject('Database not connected!');
                        }
                    });
                });
            })();

            return {
                result: response
            }

        } catch (error) { console.log(`WS Endpoint [testConnection] ${error.message}`); }
    }
}
