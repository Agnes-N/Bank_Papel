const express = require("express");

const users =require("./routers/users");
const account =require("./routers/account");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users/', users);
app.use('/api/account/', account);

app.listen(3000, () => console.log('server started on port 3000'));