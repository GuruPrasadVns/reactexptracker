import Header from "../../components/generic/Header";
import ExpenseTypeList from "../../components/ExpenseType/ExpenseTypeList";
import ExpenseTypeForm from "../../components/ExpenseType/ExpenseTypeForm";

function ShowExpenseTypePage({ expensetypes, onSubmit }){
    const expenseTypeFormTitle = "Add Expense Type";
    const formClassName = "border border-primary p-4 my-2 rounded-1";
    return (
        <>
            <Header/>
            <div className="container">
                <ExpenseTypeForm
                    title={expenseTypeFormTitle}
                    formClassName={formClassName}
                    accounts = { expensetypes }
                    onSubmit = { onSubmit }
                />
                <ExpenseTypeList expensetypes={expensetypes}/>
            </div>
        </>
    )
}

export default ShowExpenseTypePage;