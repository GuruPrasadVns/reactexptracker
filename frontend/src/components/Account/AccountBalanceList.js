import Table from '../generic/Table';
import {Link} from "react-router-dom";
import {CiEdit} from "react-icons/ci";
import { MdDeleteOutline, MdCurrencyRupee } from "react-icons/md";
function AccountBalanceList({accountBalances, accountId}){
    if(accountBalances.length === 0) return null;

    const configs = [
        { title : 'DESCRIPTION', render : accBal => accBal.description.toUpperCase()},
        { title : 'DATE', render : accBal=> {
                const displayDate = new Date(accBal.date);
                return displayDate.toDateString().toUpperCase();
            } },
        { title : 'Type', render : accBal => accBal.type.toUpperCase() },
        { title : 'AMOUNT', render : accBal => <div><MdCurrencyRupee/> {accBal.amount}</div>},
    {title : 'EDIT' , render : accBal => <div> <Link to={`/account/balance/edit/${accountId}/${accBal.id}`}><CiEdit /></Link></div>
        },
        {title : 'DELETE' , render : accBal => <div> <Link to={`/account/balance/delete/${accountId}/${accBal.id}`}><MdDeleteOutline /> </Link></div>}

    ];

    return <Table data={ accountBalances }  configs={ configs }/>
}

export default AccountBalanceList;