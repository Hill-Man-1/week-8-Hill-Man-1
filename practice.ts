import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: express.Request, res: express.Response) => {
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
