"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
let cashFlows = [
    {
        id: 1,
        cashflow: "Cash In",
        description: "Salary",
        amount: 10000,
        note: "Salary"
    },
];
app.get('/', (req, res) => {
    res.json("This is a Web About Cashflow");
});
app.get('/cashflow', (req, res) => {
    res.json(cashFlows);
});
app.get('/cashflow/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cashflow = cashFlows.find((p) => p.id === id);
    if (cashflow) {
        res.json({ cashflow });
    }
    else {
        res.status(404).json({ message: 'Cashflow not found' });
    }
});
app.post('/cashflow', (req, res) => {
    const newCashflow = {
        id: cashFlows.length + 1,
        cashflow: req.body.cashflow,
        description: req.body.description,
        amount: req.body.amount,
        note: req.body.note,
    };
    cashFlows.push(newCashflow);
    res.status(200).json(newCashflow);
});
app.put('/cashflow/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cashFlowIndex = cashFlows.findIndex((p) => p.id === id);
    if (cashFlowIndex !== -1) {
        const updateCashFlow = {
            id,
            cashflow: req.body.cashflow,
            description: req.body.description,
            amount: req.body.amount,
            note: req.body.note,
        };
        cashFlows[cashFlowIndex] = updateCashFlow;
        res.json(updateCashFlow);
    }
    else {
        res.status(404).json({ message: "Cash Flow Not Found" });
    }
});
app.patch('/cashflow/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cashFlowIndex = cashFlows.findIndex((p) => p.id === id);
    if (cashFlowIndex !== -1) {
        const updateCashFlow = Object.assign(Object.assign({}, cashFlows[cashFlowIndex]), req.body);
        cashFlows[cashFlowIndex] = updateCashFlow;
        res.json(updateCashFlow);
    }
    else {
        res.status(404).json({ message: "Cash Flow Not Found" });
    }
});
app.delete('/cashflow/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cashFlowIndex = cashFlows.findIndex((p) => p.id === id);
    if (cashFlowIndex !== -1) {
        const deleteCashFlow = cashFlows.findIndex((p) => p.id === id);
        if (cashFlowIndex !== -1) {
            const deleteCashFlow = cashFlows.splice(cashFlowIndex, 1)[0];
            res.json(deleteCashFlow);
        }
        else {
            res.status(404).json({ message: "Cash Flow Not Found" });
        }
    }
});
