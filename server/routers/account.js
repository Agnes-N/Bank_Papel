const express = require('express');
const router = express.Router()

const account = [
    {
        id: 1, 
        accountNo: 542512, 
        createdDate: "12/5/2018", 
        owner: 1, 
        type: "client", 
        status: "active",
        balance: 54.000
    }
]

router.get('/', (req,res) => {

    res.status(200).send(account) 
});

router.post('/', (req, res) => {
    const newAccount = {
        id: account.length + 1,
        accountNo: req.body.accountNo,
        createdDate: req.body.createdDate,
        owner: req.body.owner,
        type: req.body.type,
        status: req.body.status,
        balance: req.body.balance
    }

    account.push(newAccount)
    res.status(201).send(newAccount)
});



module.exports = router


