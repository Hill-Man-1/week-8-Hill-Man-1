import express, {Express, Response, Request} from 'express';
import 'dotenv/config';
const app = express();
const port = process.env.PORT;

app.get('/', (req:Request, res:Response) => {
    res.json({
        status: 200,
        message: 'Hello team 2',
        data: [
            {
                id: 1,
                title: 'Title 1'
            }
        ] 
    });  
});  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
