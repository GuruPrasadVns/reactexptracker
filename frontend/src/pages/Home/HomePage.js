import { useState } from "react";

import Header from "../../components/generic/Header";
import ExpenseList from "../../components/Expenses/ExpenseList";
import ExpenseForm from "../../components/Expenses/ExpenseForm";



function HomePage({ paymentModes, accounts, expenseTypes, onSubmit, expenses,months, years, applyFilter, resetFilter, modifiedExpenses}){
    const [showFilter, setShowFilter] = useState(false);

    const expenseFormTitle = "Add Expense";
   const formClassName = "border border-primary p-4 my-2 rounded-1";
    return (
        <>
            <Header/>
            <div className="container">
                {!showFilter && <ExpenseForm
                    title={expenseFormTitle}
                    formClassName = {formClassName}
                    onSubmit={ onSubmit }
                    paymentModes = { paymentModes }
                    accounts = {accounts}
                    expenseTypes={ expenseTypes }
                />}
                <ExpenseList
                    expenses={expenses}
                    modifiedExpenses = {modifiedExpenses}
                    paymentModes = { paymentModes }
                    accounts = {accounts}
                    expenseTypes={ expenseTypes }
                    setShowFilter = {setShowFilter}
                    showFilter = {showFilter}
                    applyFilter={applyFilter}
                    resetFilter={resetFilter}
                    months={months}
                    years = {years}
                />
            </div>
        </>
    )
}

export default HomePage;