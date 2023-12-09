import {useParams} from "react-router-dom";
import Header from "../../components/generic/Header";
import PaymentModeForm from "../../components/PaymentMode/PaymentModeForm";

function DeletePaymentModePage({ paymentModes, onSubmit }){
    const { paymentModeId } = useParams();
    const paymentModeFormTitle = "Delete Payment Mode";
    const formClassName = "border border-danger p-4 my-2 rounded-1";

    return <>
        <Header/>
        <div className="container">
            <PaymentModeForm
                title={paymentModeFormTitle}
                formClassName={formClassName}
                isDelete
                paymentModeId={paymentModeId}
                paymentModes = {paymentModes}
                onSubmit={ onSubmit }
            />
        </div>
    </>
}

export default DeletePaymentModePage;