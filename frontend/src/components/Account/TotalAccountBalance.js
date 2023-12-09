import { MdCurrencyRupee } from "react-icons/md";
function TotalAccountBalance({ accounts, balances, expenses }){
    if(accounts.length === 0) return null;

    let totalAccountBalance = 0;
    let totalExpense = 0;

    for(const balance of balances){
        totalAccountBalance += balance.amount;
    }

    for(const expense of expenses){
        totalExpense += expense.amount;
    }

    return <div className="d-flex flex-row-reverse">
        <div className="p-2 m-2 bg-success text-white">
            Total Remaining Balance : <MdCurrencyRupee/>{(totalAccountBalance - totalExpense).toFixed(2) }
        </div>

        <div className="p-2 m-2 bg-warning text-white">
            Total Expense : <MdCurrencyRupee/>{totalExpense.toFixed(2)}
        </div>
        <div className="p-2 m-2 bg-info text-white">
            Total Account Balance : <MdCurrencyRupee/>{totalAccountBalance.toFixed(2)}
        </div>
    </div>
}

export default TotalAccountBalance;