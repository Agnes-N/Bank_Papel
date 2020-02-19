import express from 'express';
import users from './routers/users';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', users);

app.listen(3000, () => console.log('server started on port 3000'));

export default app;
