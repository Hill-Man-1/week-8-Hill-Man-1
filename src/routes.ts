import express, {Response,Request} from 'express';
import bodyParser from 'body-parser';
import ICashflow from '../interface/interface';
import data from './data'


const router = express.Router();

let cashFlows: ICashflow[] = data
    
    router.get('/', (req: express.Request, res: express.Response) => {
        res.json("This is a Web About Cashflow");
    });  
    
    router.get('/cashflow', (req: express.Request, res: express.Response) => {
        res.json({
            message : "Data Cashflow",
            data: cashFlows});
    });  
    
    router.get('/cashflow/:id', (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        const cashflow = cashFlows.find((p) => p.id === id);
        if(cashflow){
            res.json({
                message: "This Data Cashflow Get By ID",
                data : cashflow});
        }else{
            res.status(404).json({message:'Cashflow not found'});
        }
    });
    
    router.post('/cashflow', (req: express.Request, res: express.Response) => {
        const newCashflow: ICashflow = {
            id: cashFlows.length + 1,
            cashflow: req.body.cashflow,
            description: req.body.description,
            amount: req.body.amount,
            note: req.body.note,
        };
        cashFlows.push(newCashflow);
        res.status(200).json({
            message : "Added to Data Cashflow",
            data: newCashflow});
    })
    
    router.put('/cashflow/:id', (req: express.Request, res: express.Response) => {
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
        res.json({message: "Updated cashflow", data: updateCashFlow});
    }else{
        res.status(404).json({message: "Cash Flow Not Found"})
    }
});

    router.delete('/cashflow/:id', (req: express.Request, res: express.Response) =>{
        const id = parseInt(req.params.id);
        const cashFlowIndex = cashFlows.findIndex((p) => p.id === id);
        if (cashFlowIndex !== -1) {
            const deleteCashFlow = cashFlows.findIndex((p) => p.id === id);
            if (cashFlowIndex !==-1){
                const deleteCashFlow = cashFlows.splice(cashFlowIndex,1)[0];
                res.json({message: "Deleted", data: deleteCashFlow});
        } else {
            res.status(404).json({message: "Cash Flow Not Found"})
        }
    }
});


export default router;