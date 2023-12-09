import {useParams} from "react-router-dom";
import Header from "../../components/generic/Header";
import ExpenseTypeForm from "../../components/ExpenseType/ExpenseTypeForm";

function DeleteExpenseTypePage({ expenseTypes, onSubmit }){
    const { expenseTypeId } = useParams();
    const expenseTypeFormTitle = "Delete Expense Type";
    const formClassName = "border border-danger p-4 my-2 rounded-1";

    return <>
        <Header/>
        <div className="container">
            <ExpenseTypeForm
                title={expenseTypeFormTitle}
                formClassName={formClassName}
                isDelete
                expenseTypeId={expenseTypeId}
                expenseTypes = {expenseTypes}
                onSubmit={ onSubmit }
            />
        </div>
    </>
}

export default DeleteExpenseTypePage;