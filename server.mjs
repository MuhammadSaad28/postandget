import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const port =  process.env.PORT || 2500;

let users = [] ;
function randomNumber(){
    return Math.floor(Math.random() * 100000000000000);
}
app.post("/user" , (req,res)=>{
    console.log(req.body);

    let newUser = {
        id : randomNumber(),
        "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
        "userName" : req.body.userName,
        "password" : req.body.password,     
    };

    users.push(newUser);
    res.status(201).send("User is Created");
})


app.get("/user/:userId" , (req,res)=>{
    let userId = req.params.userId ;
    let isFound = false ;

    for(let i = 0 ; i<users.length() ; i++){
        if(users[i].id == userId){
            isFound = true;
            res.send(users[i]);
            break;
        }
    }
    if(!isFound){
        res.status(204).send("User Not Found");
    }
})

app.get("/users", (req,res)=>{
    res.send(users);  
})

app.listen(port,()=>{
    console.log("Port Started");
})
