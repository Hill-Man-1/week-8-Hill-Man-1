import express from 'express';
import bodyParser from 'body-parser';
import routers from './routes';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(routers);
app.listen(port, () => {
    console.log(`Cashflow app listening on port ${port}`);
});
