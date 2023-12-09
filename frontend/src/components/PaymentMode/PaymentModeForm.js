import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../generic/Form";
import Label from "../generic/Label";
import Input from "../generic/Input";
import Button from "../generic/Button";

function PaymentModeForm({ title, formClassName, isEdit, paymentModes, onSubmit, paymentModeId, isDelete }){
    const [paymentModeName, setPaymentModeName] = useState('');
    const [paymentModeDescription, setPaymentModeDescription] = useState('');

    const [isRequiredError, setIsRequiredError] = useState(false);
    const [requiredErrorMessage, setRequiredErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        if(isEdit || isDelete){
            const paymentMode = paymentModes.find(payMode => payMode.id === parseInt(paymentModeId));
            if(paymentMode){
                setPaymentModeName(paymentMode.name);
                setPaymentModeDescription(paymentMode.description);
            }else{
                navigate("/paymentmodes");
            }
        }
    },[])

    const handlePaymentModeNameChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setPaymentModeName(event.target.value);
    }

    const handlePaymentModeDescriptionChange = event =>{
        setIsRequiredError(false);
        setRequiredErrorMessage('');
        setPaymentModeDescription(event.target.value);
    }

    const resetPaymentModeFormValues = ()=>{
        setPaymentModeName('');
        setPaymentModeDescription('');
        setIsRequiredError(false);
        setRequiredErrorMessage('');
    }

    const handlePaymentModeFormSubmit = async (event) =>{
        event.preventDefault();
        if(!paymentModeName){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Fill Payment Mode Name");
            return;
        }
        if(!paymentModeDescription){
            setIsRequiredError(true);
            setRequiredErrorMessage("Please Select Payment Mode Description");
            return;
        }

        const newPaymentModeObj = {
            name: paymentModeName,
            description: paymentModeDescription
        };

        if(isEdit){
            await onSubmit(newPaymentModeObj, paymentModeId);
        }else if(isDelete){
            await onSubmit(paymentModeId);
        }else{
            await onSubmit(newPaymentModeObj);
        }

        resetPaymentModeFormValues();
        navigate("/paymentmodes");
    }

    const handlePaymentModeFormReset = event =>{
        event.preventDefault();
        resetPaymentModeFormValues();
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
              onSubmit={handlePaymentModeFormSubmit}
              onReset={handlePaymentModeFormReset}
              isError={isRequiredError}
              errorMessage={requiredErrorMessage}
        >
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Label title="Payment Mode Name" htmlFor="paymentModeName" required/>
                        <Input type="text" id="paymentModeName"
                               value={paymentModeName} onChange={handlePaymentModeNameChange}
                               disabled={isDelete}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="Payment Mode Description" htmlFor="paymentModeDescription" required/>
                        <Input type="text" id="paymentModeDescription"
                               value={paymentModeDescription} onChange={handlePaymentModeDescriptionChange}
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

export default PaymentModeForm;