import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 2500;

let users = [];
function randomNumber() {
    return Math.floor(Math.random() * 100000000000000);
}
app.post("/user", (req, res) => {
    console.log(req.body);

    let newUser = {
        id: randomNumber(),
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "userName": req.body.userName,
        "password": req.body.password,
    };

    users.push(newUser);
    res.status(201).send("User is Created");
})


app.get("/user/:userId", (req, res) => {
    let userId = req.params.userId;
    let isFound = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            isFound = true;
            res.send(users[i]);
            break;
        }
    }
    if (!isFound) {
        res.status(204).send("User Not Found");
    }
})

app.get("/users", (req, res) => {
    res.send(users);
})

app.put("/user/:userId", (req, res) => {
    let userId = req.params.userId;
    let userIndex = -1;


    for(let i = 0; i<users.length; i++){
    if (users[i].id == userId) {
        userIndex = i;
        break;
    }
}
if (userIndex === -1) {
    res.status(204).send("User Not Found");
} else {
    if (req.body.firstName) {
        users[userIndex].firstName = req.body.firstName
    };
    if (req.body.lastName) {
        users[userIndex].lastName = req.body.lastName
    };
    if (req.body.userName) {
        users[userIndex].userName = req.body.userName
    };
    if (req.body.password) {
        users[userIndex].password = req.body.password
    };

    res.send(users[userIndex]);
}
}
)

app.delete("/user/:userId", (req, res) => {
    let userId = req.params.userId;
    let userIndex = -1;


    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            userIndex = i;
            break;
        }
    }
    if (userIndex === -1) {
        res.status(204).send("User Not Found");
    } else {
        users.splice(userIndex, 1);
        res.send("User is Deleted");
    }
})
app.delete("/users", (req, res) => {
    users = [];
    res.send("All Users Deleted");
})



app.listen(port, () => {
    console.log("Port Started");
})


