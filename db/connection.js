import mariadb from "mariadb";
import dotenv from 'dotenv'
dotenv.config()
let host = process.env.DB_HOST
let user =  process.env.DB_USER
let password  = process.env.DB_PASSWORD
let database = process.env.DB_DATABASE

async function dbQuery(queryString){
  const pool = mariadb.createPool({
    host,
    user,
    password,
    database,
  });
  let conn = await mariadb.createConnection({host, user, password, database})
  let result = await conn.query(queryString)
  return result.filter(()=>true)
}

async function dbMutation(queryString){
  console.log("dbMutation", queryString)
  try{
    const pool = mariadb.createPool({
      host,
      user,
      password,
      database,
    });
    let conn = await mariadb.createConnection({host, user, password, database})
    let result = await conn.query(queryString)
    return "success"
  }catch(e){
    console.log(e)
    return  "fail"
  }
}

async function connection(host, user, password, database) {
  const pool = mariadb.createPool({
    host,
    user,
    password,
    database,
  });
  let conn
  try {
    conn = await pool.getConnection();
    console.log("sucessfully connect to db");
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

export { connection, dbQuery, dbMutation };
