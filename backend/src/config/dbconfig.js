
import mysql from "mysql";

export const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fyp_full_stack_website',
});

export const dbconnect = async () => {
  try {
    // Connect to MySQL
    con.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
      }
      console.log('Connected to MySQL database');
    });
  } catch (error) {
    console.error("MySQL database error:", error);
  }
};

// Optionally, you might want to export 'con' directly if needed in other files
// export { con, dbconnect };


