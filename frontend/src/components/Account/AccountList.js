import { MdDeleteOutline, MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiEdit} from "react-icons/ci";
import Table from "../generic/Table";

function AccountList({ accounts, balances, expenses }){
    if(accounts.length === 0) return null;

    const configs = [
        { title : 'NAME', render : acc => <div><Link to={`/account/balance/${acc.id}`}>{acc.name.toUpperCase()}</Link></div>},
        { title : 'DESCRIPTION', render : acc=> acc.description.toUpperCase() },
        { title : 'ADDRESS', render : acc => acc.address.toUpperCase() },
        { title : 'BALANCE', render : acc => {
                const name = acc.name;
                const accountBalances = balances.filter(bal => bal.account === name);
                let totalBalance = 0;
                for(let accountBal of accountBalances){
                    totalBalance += accountBal.amount;
                }
                return <div><MdCurrencyRupee/>{totalBalance.toFixed(2)}</div>;
            } },
        { title : 'EXPENSE', render : acc => {
                const name = acc.name;
                const accountExpenses = expenses.filter(exp => exp.account === name);
                let totalExpense = 0;
                for(let accountExpense of accountExpenses){
                    totalExpense += accountExpense.amount;
                }
                return <div><MdCurrencyRupee/>{totalExpense.toFixed(2)}</div>;
            } },
        { title : 'REMAINING BALANCE', render : acc =>  {
                const name = acc.name;

                const accountBalances = balances.filter(bal => bal.account === name);
                let totalBalance = 0;
                for(let accountBal of accountBalances){
                    totalBalance += accountBal.amount;
                }

                const accountExpenses = expenses.filter(exp => exp.account === name);
                let totalExpense = 0;
                for(let accountExpense of accountExpenses){
                    totalExpense += accountExpense.amount;
                }

                return <div><MdCurrencyRupee/>{(totalBalance - totalExpense).toFixed(2)}</div>;
            }},
        {title : 'EDIT' , render : acc => <div> <Link to={`/account/edit/${acc.id}`}><CiEdit /></Link></div>
        },
        {title : 'DELETE' , render : acc => <div> <Link to={`/account/delete/${acc.id}`}><MdDeleteOutline /></Link> </div>}
    ];

    return <Table data={ accounts }  configs={ configs }/>
}

export default AccountList;