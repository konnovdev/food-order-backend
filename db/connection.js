import mariadb from "mariadb"

async function connection(host, user, password, database) {
    const pool = mariadb.createPool({
        host,
        user,
        password,
        database
    });
  let conn;
  
  try {
	conn = await pool.getConnection();
    console.log("sucessfully connect to db")
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

export {connection}