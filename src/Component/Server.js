const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json())
app.use(cors())

// => Db Connection

const db = {
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
}

// => Create Connection

const conn = mysql.createConnection(db);

// => To check connected or Not

conn.connect((err) => {
    if (err) console.log("Connection Error : ", err);
    else console.log("Connected")
})

// => To pass data in db

app.post("/data", (req, res) => {
    const query = "Insert into users (email,password) VALUES (?)";
    const values = [req.body.email, req.body.password];
    conn.query(query, [values], (err, result) => {
        if (err) console.log("Db Insert Error : ", err);
        else console.log("Db Insert Result", result);
    })
})

// To get data from db

app.get("/login",(req,res)=>{
    const query1="SELECT * from users";
    const values1=[req.body.email,req.body.password];
    conn.query(query1,[values1],(err1,result1)=>{
        if (err1) console.log("Data fetch Error",err1);
        else console.log("Fetched Data : ",result1);
        res.send(result1);
    })
})

// => To Delete Data

app.post("/deletedata/:dataid",(req,res)=>{
    const id=req.params.dataid;    
    // console.log(id);
    const query1=`DELETE from users where id=${id}`;
    conn.query(query1,(err2,result2)=>{
        if (err2) console.log("Data Delete Error",err2);
        else console.log("Data Deleted : ",result2);        
    })
})

// => To check Server code is working or not

app.listen(3999, () => {
    console.log("Listening....");
})