import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../generic/Form";
import Label from "../generic/Label";
import Input from "../generic/Input";
import Button from "../generic/Button";

function ExpenseTypeForm({ title, formClassName, isEdit, expenseTypes, onSubmit, expenseTypeId, isDelete }){
    const [expenseTypeName, setExpenseTypeName] = useState('');
    const [expenseTypeDescription, setExpenseTypeDescription] = useState('');

    const [isRequiredError, setIsRequiredError] = useState(false);
    const [requiredErrorMessage, setRequiredErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        if(isEdit || isDelete){
            const expenseType = expenseTypes.find(expType => expType.id === parseInt(expenseTypeId));
            if(expenseType){
                setExpenseTypeName(expenseType.name);
                setExpenseTypeDescription(expenseType.description);
            }else{
                navigate("/expensetypes");
            }
        }
    },[])

    const handleExpenseTypeNameChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setExpenseTypeName(event.target.value);
    }

    const handleExpenseTypeDescriptionChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setExpenseTypeDescription(event.target.value);
    }

    const resetExpenseTypeFormValues = ()=>{
        setExpenseTypeName('');
        setExpenseTypeDescription('');
        setIsRequiredError(false);
        setRequiredErrorMessage('');
    }

    const handleExpenseTypeFormSubmit = async (event) =>{
        event.preventDefault();
        if(!expenseTypeName){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Fill Expense Type Name");
            return;
        }
        if(!expenseTypeDescription){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Select Expense Type Description");
            return;
        }

        const newExpenseTypeObj = {
            name: expenseTypeName,
            description: expenseTypeDescription
        };

        if(isEdit){
            await onSubmit(newExpenseTypeObj, expenseTypeId);
        }else if(isDelete){
            await onSubmit(expenseTypeId);
        }else{
            await onSubmit(newExpenseTypeObj);
        }

        resetExpenseTypeFormValues();
        navigate("/expensetypes");
    }

    const handleExpenseTypeFormReset = event =>{
        event.preventDefault();
        resetExpenseTypeFormValues();
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
              onSubmit={handleExpenseTypeFormSubmit}
              onReset={handleExpenseTypeFormReset}
              isError={isRequiredError}
              errorMessage={requiredErrorMessage}
        >
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Label title="ExpenseType Name" htmlFor="expenseTypeName" required/>
                        <Input type="text" id="expenseTypeName"
                               value={expenseTypeName} onChange={handleExpenseTypeNameChange}
                               disabled={isDelete}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="ExpenseType Description" htmlFor="expenseTypeDescription" required/>
                        <Input type="text" id="expenseTypeDescription"
                               value={expenseTypeDescription} onChange={handleExpenseTypeDescriptionChange}
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

export default ExpenseTypeForm;