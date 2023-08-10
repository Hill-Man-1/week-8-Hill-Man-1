import express, {Response,Request} from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


interface ICashflow{
    id:number;
    cashflow:string;
    description:string;
    amount:number;
    note:string;
} 

let cashFlows: ICashflow[] = [
    {
        id: 1,
        cashflow: "Cash In",
        description: "Salary",
        amount: 10000,
        note: "Salary"},
    ];
    
    app.get('/', (req: express.Request, res: express.Response) => {
        res.json("This is a Web About Cashflow");
    });  
    
    app.get('/cashflow', (req: express.Request, res: express.Response) => {
        res.json(cashFlows);
    });  
    
    app.get('/cashflow/:id', (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        const cashflow = cashFlows.find((p) => p.id === id);
        if(cashflow){
            res.json({cashflow});
        }else{
            res.status(404).json({message:'Cashflow not found'});
        }
    });
    
    app.post('/cashflow', (req: express.Request, res: express.Response) => {
        const newCashflow: ICashflow = {
            id: cashFlows.length + 1,
            cashflow: req.body.cashflow,
            description: req.body.description,
            amount: req.body.amount,
            note: req.body.note,
        };
        cashFlows.push(newCashflow);
        res.status(200).json(newCashflow);
    })
    
    app.put('/cashflow/:id', (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        const cashFlowIndex = cashFlows.findIndex((p) => p.id === id);
        if (cashFlowIndex !== -1){
            const updateCashFlow : ICashflow = {
                id,
                cashflow: req.body.cashflow,
                description: req.body.description,
                amount: req.body.amount,
                note: req.body.note,
        };
        cashFlows[cashFlowIndex] = updateCashFlow;
        res.json(updateCashFlow);
    }else{
        res.status(404).json({message: "Cash Flow Not Found"})
    }
});

app.delete('/cashflow/:id', (req: express.Request, res: express.Response) =>{
    const id = parseInt(req.params.id);
    const cashFlowIndex = cashFlows.findIndex((p) => p.id === id);
    if (cashFlowIndex !== -1) {
        const deleteCashFlow = cashFlows.findIndex((p) => p.id === id);
        if (cashFlowIndex !==-1){
            const deleteCashFlow = cashFlows.splice(cashFlowIndex,1)[0];
            res.json(deleteCashFlow);
        } else {
            res.status(404).json({message: "Cash Flow Not Found"})
        }
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});