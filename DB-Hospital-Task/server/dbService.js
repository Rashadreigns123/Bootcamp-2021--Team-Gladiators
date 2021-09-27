const mysql = require("mysql");
const dotenv = require('dotenv')

dotenv.config();



let instance = null;

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  // async getAllData() {
  //   try {
  //     const response = await new Promise((resolve, reject) => {
  //       const query = "SELECT * FROM rowdata;";

  //       connection.query(query, (err, results) => {
  //         if (err) reject(new Error(err.message));
  //         resolve(results);
  //       });
  //     });
  //     return response;
  //   } catch (error) {
  //     console.log("error in read", error);
  //   }
  // }


  // async updateBalance(balance, username) {
  //   try {
  //     const response = await new Promise((resolve, reject) => {
  //       const query = `UPDATE users SET balance = ${balance} WHERE username='${username}'`;

  //       connection.query(query, (err, result) => {
  //         if (err) reject(new Error(err.message));
  //         resolve(result.affectedRows);
  //       });
  //     });

  //     return response === 1 ? true : false;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  async insertData(data) {


     var k=0

     k= await data.map(async (i) => {







      const response = await new Promise((resolve, reject) => {
        const query = `INSERT INTO Record(Aadhar,service_id,hospital_code,doctor_id,prescribed_medicines,Date,bill_id)  values(${i.Aadhar},${i.service_id},${i.hospital_code},'${i.doctor_id}','${i.prescribed_medicines}','${i.Date}',${i.bill_id});`;

        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));

          resolve();
        });
         
           


      });

       })

    console.log(k);


    
    return k != 0 ? true : false  ;
    


  }

  async insertBillData(data) {

    //   data.map( (i)=>{

    //   console.log(i.id);
    //   console.log(i.name);

    //   })
    // }

     var k=0

     k= await data.map(async (i) => {







      const response = await new Promise((resolve, reject) => {
        const query = `INSERT INTO Bill(bill_amount) values(${i.bill_amount});`;

        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));

          resolve();
        });
         
           


      });

      







    })

    console.log(k);


    
    return k != 0 ? true : false  ;
    


  }


  //    id=Number(id);
  //    console.log(id);
  //    console.log(name);
  //   try {
  //     const response = await new Promise((resolve, reject) => {
  //       const query = `INSERT INTO rowdata values( ${id},'${name}')`;

  //       connection.query(query, (err, result) => {
  //         if (err) reject(new Error(err.message));
  //         console.log(result);
  //         resolve(result.affectedRows);
  //       });
  //     });

  //     return response != 0 ? true : false;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }
}

module.exports = DbService;