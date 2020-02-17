const express = require('express');
const router = express.Router()

const transaction = [
    {
        id: 1,
        createdDate: "12/5/2018", 
        type: "debit", 
        accountNo: 542512, 
        cashier: 2,
        amount: 50.000,
        odBalance: 4.000,
        newBalance: 54.000
    }
]

router.get('/', (req,res) => {

    res.status(200).send(transaction) 
});

router.post('/', (req, res) => {
    const newTransaction = {
        id: transaction.length + 1,
        createdDate: req.body.createdDate,
        type: req.body.type,
        cashier: req.body.cashier,
        amount: req.body.amount,
        odBalance: req.body.odBalance,
        newBalance: req.body.newBalance
    }

    transaction.push(newTransaction)
    res.status(201).send(newTransaction)
});



module.exports = router


