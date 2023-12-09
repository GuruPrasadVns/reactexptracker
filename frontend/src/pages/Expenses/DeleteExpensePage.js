import { useParams } from 'react-router-dom';
import Header from "../../components/generic/Header";
import ExpenseForm from "../../components/Expenses/ExpenseForm";
function DeleteExpensePage({ paymentModes, accounts, expenseTypes, expenses, onSubmit }){
    const { expenseId } = useParams();
    const expenseFormTitle = "Delete Expense";
    const formClassName = "border border-danger p-4 my-2 rounded-1";
    return <>
        <Header/>
        <div className="container">
            <ExpenseForm
                title={expenseFormTitle}
                formClassName={formClassName}
                isDelete
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

export default DeleteExpensePage;