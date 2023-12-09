import {useParams} from "react-router-dom";
import Header from "../../components/generic/Header";
import PaymentModeForm from "../../components/PaymentMode/PaymentModeForm";

function EditPaymentModePage({ paymentModes, onSubmit }){
    const { paymentModeId } = useParams();
    const paymentModeFormTitle = "Edit Payment Mode";
    const formClassName = "border border-warning p-4 my-2 rounded-1";

    return <>
        <Header/>
        <div className="container">
            <PaymentModeForm
                title={paymentModeFormTitle}
                formClassName={formClassName}
                isEdit
                paymentModeId={paymentModeId}
                paymentModes = {paymentModes}
                onSubmit={ onSubmit }
            />
        </div>
    </>
}

export default EditPaymentModePage;