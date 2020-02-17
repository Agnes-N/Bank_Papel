const express = require('express');
const router = express.Router()

const users = [
    {
        id: 1, 
        email: "agg@gmail.com", 
        firstName: "Agnes", 
        lastName:"Reina", 
        type: "client", 
        isAdmin: "false"
    }
]

router.get('/', (req,res) => {

    res.status(200).send(users) 
});

router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        isAdmin: req.body.isAdmin
    }

    users.push(newUser)
    res.status(201).send(newUser)
});



module.exports = router


