import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../generic/Form";
import Label from "../generic/Label";
import Input from "../generic/Input";
import Button from "../generic/Button";
import Select from "../generic/Select";

function AccountForm({ title, formClassName, isEdit, accounts, onSubmit, accountId, isDelete, accountTypes }){
    const [accountName, setAccountName] = useState('');
    const [accountDescription, setAccountDescription] = useState('');
    const [accountAddress, setAccountAddress] = useState('');
    const [accountType, setAccountType] = useState('');

    const [isRequiredError, setIsRequiredError] = useState(false);
    const [requiredErrorMessage, setRequiredErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        if(isEdit || isDelete){
            const account = accounts.find(acc => acc.id === parseInt(accountId));
            if(account){
                setAccountName(account.name);
                setAccountDescription(account.description);
                setAccountAddress(account.address);
                const accountType = accountTypes.find(accType => accType.name === account.type);
                setAccountType("2");
            }else{
                navigate("/accounts");
            }
        }
    },[])

    const handleAccountNameChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setAccountName(event.target.value);
    }

    const handleAccountDescriptionChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setAccountDescription(event.target.value);
    }

    const handleAccountAddressChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setAccountAddress(event.target.value);
    }

    const handleAccountTypeChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setAccountType(event.target.value);
    }

    const resetAccountFormValues = ()=>{
        setAccountName('');
        setAccountDescription('');
        setAccountAddress('');
        setAccountType("0");
        setIsRequiredError(false);
        setRequiredErrorMessage('');
    }

    const handleAccountFormSubmit = async (event) =>{
        event.preventDefault();
        if(!accountName){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Fill Account Name");
            return;
        }
        if(!accountDescription){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Select Account Description");
            return;
        }
        if(!accountAddress){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Fill Account Address");
            return;
        }
        if(!accountType){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Select Account Type");
            return;
        }

        const newAccountObj = {
            name: accountName,
            description: accountDescription,
            address: accountAddress,
            type: accountType
        };

        if(isEdit){
            await onSubmit(newAccountObj, accountId);
        }else if(isDelete){
            await onSubmit(accountId);
        }else{
            await onSubmit(newAccountObj);
        }

        resetAccountFormValues();
        navigate("/accounts");
    }

    const handleAccountFormReset = event =>{
        event.preventDefault();
        resetAccountFormValues();
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
              onSubmit={handleAccountFormSubmit}
              onReset={handleAccountFormReset}
              isError={isRequiredError}
              errorMessage={requiredErrorMessage}
        >
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Label title="Account Name" htmlFor="accountName" required/>
                        <Input type="text" id="accountName"
                               value={accountName} onChange={handleAccountNameChange}
                               disabled={isDelete}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="Account Description" htmlFor="accountDescription" required/>
                        <Input type="text" id="accountDescription"
                               value={accountDescription} onChange={handleAccountDescriptionChange}
                               disabled={isDelete}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Label title="Account Address" htmlFor="accountAddress" required/>
                        <Input type="text" id="accountAddress"
                               value={accountAddress} onChange={handleAccountAddressChange}
                               disabled={isDelete}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="Account Type" htmlFor="accountType" required/>
                        <Select items={accountTypes} id="accountType"
                                title="Select Account Type"
                                value={accountTypes}
                                onChange={handleAccountTypeChange}
                                disabled={isDelete}
                        />
                    </div>
                </div>
            </div>
            {submitButton}
            {!isDelete && <Button type={"reset"} className={"btn btn-secondary"} title="Reset" style={{marginLeft: '5px'}}/>}
        </Form>
    )
}

export default AccountForm;