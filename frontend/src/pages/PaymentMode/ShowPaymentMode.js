import Header from "../../components/generic/Header";
import PaymentModeForm from "../../components/PaymentMode/PaymentModeForm";
import PaymentModeList from "../../components/PaymentMode/PaymentModeList";

function ShowPaymentMode({ paymentModes, onSubmit }){
    const paymentModeFormTitle = "Add Payment Mode";
    const formClassName = "border border-primary p-4 my-2 rounded-1";
    return (
        <>
            <Header/>
            <div className="container">
                <PaymentModeForm
                    title={paymentModeFormTitle}
                    formClassName={formClassName}
                    paymentModes = { paymentModes }
                    onSubmit = { onSubmit }
                />
                <PaymentModeList paymentModes={paymentModes}/>
            </div>
        </>
    )
}

export default ShowPaymentMode;