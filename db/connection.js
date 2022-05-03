import mariadb from "mariadb";
import dotenv from 'dotenv'
dotenv.config()

let host = process.env.MYSQL_HOST
let user =  process.env.MYSQL_USER
let password  = process.env.MYSQL_PASSWORD
let database = process.env.MYSQL_DATABASE
let connectionCfg = {host, user, password, database}

async function dbQuery(queryString){
  console.log("dbQuery", queryString)
  let conn
  try{
    conn = await mariadb.createConnection(connectionCfg)
  }catch (e){
    console.log("Fail to create connection", e)
  }
  let result
  try{
    result = await conn.query(queryString)
  }catch (e){
    console.log("Fail to request a query", e)
  }
  conn.end();
  return result.filter(()=>true)
}

async function dbMutation(queryString){
  console.log("dbMutation", queryString)
  let conn
  try{
    conn = await mariadb.createConnection(connectionCfg)
    await conn.query(queryString)

    
  }catch(e){
    console.log(e)
    return  "fail"
  }
  
  conn.end();
  return "success"
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
