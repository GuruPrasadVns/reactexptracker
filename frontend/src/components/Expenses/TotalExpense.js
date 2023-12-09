import { MdCurrencyRupee } from "react-icons/md";
function TotalExpense({ modifiedExpenses }){

    if(modifiedExpenses.length === 0) return null;

    let totalAmount = 0;

    for(const expense of modifiedExpenses){
        totalAmount += expense.amount;
    }

    return <div className="d-flex flex-row-reverse">
        <div className="p-2 m-2 bg-warning text-white">
            Total Expense : <MdCurrencyRupee/>{totalAmount.toFixed(2)}
        </div>
    </div>
}

export default TotalExpense;