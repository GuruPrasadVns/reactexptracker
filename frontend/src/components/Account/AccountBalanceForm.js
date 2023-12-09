import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../generic/Form";
import Label from "../generic/Label";
import Input from "../generic/Input";
import Button from "../generic/Button";

function AccountBalanceForm({ title, formClassName, isEdit, accountName, onSubmit, accountId, balanceId, isDelete, accounts, balances }){
    const [accountBalanceDescription, setAccountBalanceDescription] = useState('');
    const [accountBalanceDate, setAccountBalanceDate] = useState('');
    const [amount, setAmount] = useState('');

    const [isRequiredError, setIsRequiredError] = useState(false);
    const [requiredErrorMessage, setRequiredErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        if(isEdit || isDelete){
            const balance= balances.find(bal => bal.id === parseInt(balanceId));
            if(balance){
                setAccountBalanceDescription(balance.description);
                setAccountBalanceDate(balance.date);
                setAmount(balance.amount);
            }else{
                navigate(`/account/balance/${accountId}`);
            }
        }
    },[])

    const handleAccountBalanceDescriptionChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setAccountBalanceDescription(event.target.value);
    }


    const handleAccountBalanceDateChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setAccountBalanceDate(event.target.value);
    }

    const handleAmountChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setAmount(parseFloat(event.target.value) || 0.0 );
    }

    const resetAccountBalanceFormValues = ()=>{
        setAccountBalanceDescription('');
        setAccountBalanceDate('');
        setAmount('')
        setIsRequiredError(false);
        setRequiredErrorMessage('');
    }

    const handleAccountBalanceFormSubmit = async (event) =>{
        event.preventDefault();
        if(!accountBalanceDescription){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Fill Account Balance Description");
            return;
        }

        if(!accountBalanceDate){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Fill Account Balance Date");
            return;
        }
        if(!amount){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Fill Account Balance Amount");
            return;
        }

        const newAccountBalanceObj = {
            description: accountBalanceDescription,
            type: 'addition',
            date: accountBalanceDate,
            account: accountName,
            amount: amount
        };

        if(isEdit){
            await onSubmit(newAccountBalanceObj, balanceId);
        }else if(isDelete){
            await onSubmit(balanceId);
        }else{
            await onSubmit(newAccountBalanceObj);
        }

        resetAccountBalanceFormValues();
        navigate(`/account/balance/${accountId}`);
    }

    const handleAccountBalanceFormReset = event =>{
        event.preventDefault();
        resetAccountBalanceFormValues();
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
        <>
            <div className="bg-warning p-3 my-3 border border-danger text-danger rounded-3"><h4>{accountName.toUpperCase()}</h4></div>
            <hr/>
        <Form title={title} className={formClassName}
              onSubmit={handleAccountBalanceFormSubmit}
              onReset={handleAccountBalanceFormReset}
              isError={isRequiredError}
              errorMessage={requiredErrorMessage}
        >
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Label title="Account Balance Description" htmlFor="accountBalanceDescription" required/>
                        <Input type="text" id="accountBalanceDescription"
                               value={accountBalanceDescription} onChange={handleAccountBalanceDescriptionChange}
                               disabled={isDelete}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="Account Balance Date" htmlFor="accountBalanceDate" required/>
                        <Input type="date" id="accountBalanceDate"
                               value={accountBalanceDate} onChange={handleAccountBalanceDateChange}
                               disabled={isDelete}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Label title="Account Balance Amount" htmlFor="accountBalanceAmount" required/>
                        <Input type="number" id="accountBalanceAmount"
                               value={amount} onChange={handleAmountChange}
                               disabled={isDelete}
                        />
                    </div>
                </div>
            </div>
            {submitButton}
            {!isDelete && <Button type={"reset"} className={"btn btn-secondary"} title="Reset" style={{marginLeft: '5px'}}/>}
        </Form>
        </>
    )
}

export default AccountBalanceForm;