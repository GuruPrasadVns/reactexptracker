import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Label from "../generic/Label";
import Input from "../generic/Input";
import Select from "../generic/Select";
import Button from "../generic/Button";
import Form from "../generic/Form";

function ExpenseForm({ title, formClassName, onSubmit, paymentModes, accounts, expenseTypes, isEdit, expenseId,
                         expenses, isDelete  }){

    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseType, setExpenseType] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [expenseAccount, setExpenseAccount] = useState('');
    const [expenseMode, setExpenseMode] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');

    const [isRequiredError, setIsRequiredError] = useState(false);
    const [requiredErrorMessage, setRequiredErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        if(isEdit || isDelete){
            const expense = expenses.find(exp => exp.id === parseInt(expenseId));
            if(expense){
                const expType = expenseTypes.find(expType => expType.name === expense.type);
                const account = accounts.find(acc => acc.name === expense.account);
                const paymentMode = paymentModes.find(payMode => payMode.name === expense.mode);
                setExpenseDescription(expense.description);
                setExpenseType(expType.id.toString());
                setExpenseDate(expense.date);
                setExpenseAccount(account.id.toString());
                setExpenseMode(paymentMode.id.toString());
                setExpenseAmount(expense.amount);
            }else{
                navigate("/");
            }
        }
    },[])

    const handleExpenseDescriptionChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setExpenseDescription(event.target.value);
    }

    const handleExpenseAmountChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        const amount = parseFloat(event.target.value) || 0 ;
        setExpenseAmount(amount);
    }

    const handleExpenseTypeChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setExpenseType(event.target.value);
    }

    const handleExpenseDateChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setExpenseDate(event.target.value);
    }

    const handleExpenseAccountChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setExpenseAccount(event.target.value);
    }

    const handleExpenseModeChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setExpenseMode(event.target.value);
    }

    const resetExpenseFormValues = ()=>{
        setExpenseDescription('');
        setExpenseType("0");
        setExpenseDate('');
        setExpenseAccount("0");
        setExpenseMode("");
        setExpenseAmount("");
        setIsRequiredError(false);
        setRequiredErrorMessage('');
    }

    const handleExpenseFormSubmit = async (event) =>{
        event.preventDefault();
        if(!expenseDescription){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Fill Expense Description");
            return;
        }
        if(!expenseType || expenseType === "0"){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Select Expense Type");
            return;
        }
        if(!expenseDate){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Fill Expense Date");
            return;
        }
        if(!expenseAccount || expenseAccount === "0"){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Select Expense Account");
            return;
        }
        if(!expenseMode || expenseMode === "0"){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Select Expense Mode");
            return;
        }
        if(!expenseAmount){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Fill Expense Amount");
            return;
        }

        const expenseTypeTitle = expenseTypes.find(expType => expType.id === parseInt(expenseType));
        const expenseAccountTitle = accounts.find(acc => acc.id === parseInt(expenseAccount));
        const expenseModeTitle = paymentModes.find(payMode => payMode.id === parseInt(expenseMode))

        const newExpenseObj = {
            description: expenseDescription,
            type: expenseTypeTitle.name,
            date: expenseDate,
            account: expenseAccountTitle.name,
            mode: expenseModeTitle.name,
            amount: expenseAmount
        };
        if(isEdit){
            await onSubmit(newExpenseObj, expenseId);
        }else if(isDelete){
            await onSubmit(expenseId);
        }else{
            await onSubmit(newExpenseObj);
        }

        resetExpenseFormValues();
        navigate("/");
    }

    const handleExpenseFormReset = event =>{
        event.preventDefault();
        resetExpenseFormValues();
    }

    let submitButton = null;
    if(title.toLowerCase().includes("add")){
        submitButton = <Button type={"submit"} className={"btn btn-primary"} title="Submit"/>
    }else if(title.toLowerCase().includes("edit")){
        submitButton = <Button type={"submit"} className={"btn btn-warning"} title="Update"/>
    }else if(title.toLowerCase().includes("delete")){
        submitButton = <Button type={"submit"} className={"btn btn-danger"} title="Delete"/>
    }

    return (
        <Form title={title} className={formClassName}
                 isError={isRequiredError}
                 errorMessage={requiredErrorMessage}
                 onSubmit={handleExpenseFormSubmit}
                 onReset={handleExpenseFormReset} >

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Label title="Expense Description" htmlFor="expenseDescription" required/>
                        <Input type="text" id="expenseDescription"
                            value={expenseDescription} onChange={handleExpenseDescriptionChange}
                               disabled={isDelete}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="Expense Type" htmlFor="expenseType" required/>
                        <Select items={expenseTypes} id="expenseType"
                                title="Select Expense Type"
                                value={expenseType}
                                onChange={handleExpenseTypeChange}
                                disabled={isDelete}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Label title="Expense Date" htmlFor="expenseDate" required/>
                        <Input type="date" id="expenseDescription" value={expenseDate}
                               onChange={handleExpenseDateChange}
                               disabled={isDelete}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="From Account" htmlFor="expenseAccount" required/>
                        <Select items={accounts} id="expenseAccount" title="Select Account"
                                value={expenseAccount}
                                onChange={handleExpenseAccountChange}
                                disabled={isDelete}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Label title="Expense Mode" htmlFor="expenseMode" required/>
                        <Select items={paymentModes} id="expenseMode" title="Select Payment Mode"
                                value={expenseMode}
                                onChange={handleExpenseModeChange}
                                disabled={isDelete}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="Amount" htmlFor="expenseAmount" required/>
                        <Input type="number" id="expenseAmount"
                            value={expenseAmount} onChange={handleExpenseAmountChange}
                               disabled={isDelete}
                        />
                    </div>
                </div>
            </div>
            {submitButton}
            {!isDelete && <Button type={"reset"} className={"btn btn-secondary"} title="Reset" style={{marginLeft: '5px'}}/>}
        </Form>
    );
}

export default ExpenseForm;