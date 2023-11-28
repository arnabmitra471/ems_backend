import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
const app = express()
const port = 3000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ems_db"
})
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.get("/employees",(req,res)=>{
    const q = "SELECT * from employees";
    db.query(q,(err,data)=>{
        if(err)
        {
            console.log(err);
            return res.json(err);
        }
        else
        {
            return res.json(data);
        }
    })
})
app.post("/create",(req,res)=>{
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let salary = req.body.salary;
    let address = req.body.address;
    db.query("INSERT INTO employees values (?,?,?,?,?,?)",[id,name,email,password,salary,address],(err,data)=>{
        if(err)
        {
            console.log(err);
            return res.json(err);
        }
        else
        {
            console.log("You have registered successfully");
            return res.json(data);
        }
    })
})
app.get("/employeesDetails/:id",(req,res)=>{
    const id = req.params.id
    db.query("SELECT * from employees where id = ?",id,(err,data)=>{
        if(err)
        {
            console.log(err); 
        }
        else
        {
            res.send(data);
        }
    })
})
app.put("/employees/:id",(req,res)=>{
    const emp_id = req.params.id;
    const q =  "UPDATE employees SET name = ?,salary = ?, address = ?,email = ?, password = ? WHERE id = ?";

    const values = [
        req.body.name,
        req.body.salary,
        req.body.address,
        req.body.email,
        req.body.password
    ]
    db.query(q,[...values,emp_id],(err,data)=>{
        if(err)
        {
            return res.send(err);
        }
        else
        {
            return res.json(data);
        }
    })

})
app.delete("/employees/:id",(req,res)=>{
    const emp_id = req.params.id;
    const q = "DELETE FROM employees WHERE id = ?";
    db.query(q,[emp_id],(err,data)=>{
        if(err)
        {
            return res.send(err);
        }
        else
        {
            return res.json(data)
        }
    })
})
app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
})