const express = require("express");
const app = express();

const mysql = require("mysql");

  const db = mysql.createConnection({
    host: "localhost", // mysql host name
    user: "root", // mysql username
    password: "", // mysql password
    database: "crud"   // mysql database name
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to database");
});


app.listen(3000, () => {
    
    console.log("Server is running on port 3000");
  
});



app.get("/users", (req, res) => {

    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {

        if(err){
            console.error(err);
            res.status(500).send("Error listing users");
        }else{
        
            res.send(result);
            
        }
    });

});

app.get("/users/add", (req, res) => {

    const name =  req.query.name;
    const email = req.query.email;


    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";

    db.query(sql, [name, email], (err, result) => {

        if(err){
            console.error(err);
            res.status(500).send("Error adding user");
        }else{
        
            res.send("User added successfully");
            res.status(200).send("User added successfully");

        }
    });


});



app.get("/users/update/", (req,res) => {

    const id = req.query.id;
    const name =  req.query.name;
    const email = req.query.email;

    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";

    db.query(sql,[name, email, id], (err, result) => {
        if(err){
            console.error(err);
            res.status(500).send("Error updating user");
        }else{
                
            res.send("User updated successfully");
            res.status(200).send("User updated successfully");
        
        }
    });

});


app.get("/users/delete/", (req,res) => {

    const id = req.query.id;

    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql,id, (err, result) => {

        if(err){
            console.error(err);
            res.status(500).send("Error deleting user");
        }else{
            
                res.send("User deleted successfully");
                res.status(200).send("User deleted successfully");
    
            }
    });

});

  






