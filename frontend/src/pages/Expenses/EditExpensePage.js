import { useParams } from 'react-router-dom';
import Header from "../../components/generic/Header";
import ExpenseForm from "../../components/Expenses/ExpenseForm";

function EditExpensePage({ paymentModes, accounts, expenseTypes, expenses, onSubmit }){
    const { expenseId } = useParams();
    const expenseFormTitle = "Edit Expense";
    const formClassName = "border border-warning p-4 my-2 rounded-1";
    return <>
        <Header/>
        <div className="container">
            <ExpenseForm
                title={expenseFormTitle}
                formClassName={formClassName}
                isEdit
                expenseId={expenseId}
                paymentModes = { paymentModes }
                accounts = {accounts}
                expenseTypes={ expenseTypes }
                expenses = { expenses }
                onSubmit={ onSubmit }
            />
        </div>
    </>
}

export default EditExpensePage;