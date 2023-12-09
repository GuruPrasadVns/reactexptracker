import {useParams} from "react-router-dom";
import Header from "../../components/generic/Header";
import ExpenseTypeForm from "../../components/ExpenseType/ExpenseTypeForm";

function EditExpenseTypePage({ expenseTypes, onSubmit }){
    const { expenseTypeId } = useParams();
    const expenseTypeFormTitle = "Edit Expense Type";
    const formClassName = "border border-warning p-4 my-2 rounded-1";

    return <>
        <Header/>
        <div className="container">
            <ExpenseTypeForm
                title={expenseTypeFormTitle}
                formClassName={formClassName}
                isEdit
                expenseTypeId={expenseTypeId}
                expenseTypes = {expenseTypes}
                onSubmit={ onSubmit }
            />
        </div>
    </>
}

export default EditExpenseTypePage;