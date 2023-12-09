import { MdCurrencyRupee, MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';

import Table from "../generic/Table";
import TotalExpense from "./TotalExpense";
import FilterExpense from "./FilterExpense";
import {useState} from "react";
function ExpenseList({ expenses, expenseTypes,paymentModes, accounts, setShowFilter, showFilter,months, years, applyFilter, resetFilter, modifiedExpenses }){
    const [filterTitle, setFilterTitle] = useState('Show Filter');
    const toggleFilter = ()=>{
        if(!showFilter){
            setShowFilter(true);
            setFilterTitle('Hide Filter & Add Expense');
        }else{
            setShowFilter(false);
            setFilterTitle('Show Filter');
        }
    }

    if(expenses.length === 0) return null;

    const configs = [
        { title : 'DESCRIPTION', render : exp => exp.description.toUpperCase() },
        { title : 'TYPE', render : exp=> exp.type.toUpperCase() },
        { title : 'DATE', render : exp => {
                const displayDate = new Date(exp.date);
                return displayDate.toDateString().toUpperCase();
            } },
        { title : 'ACCOUNT', render : exp => exp.account.toUpperCase() },
        { title : 'MODE', render : exp => exp.mode.toUpperCase() },
        { title : 'AMOUNT', render : exp => <div><MdCurrencyRupee/> {exp.amount.toFixed(2)}</div>},
        {title : 'EDIT' , render : exp => <div> <Link to={`/expense/edit/${exp.id}`}><CiEdit /></Link></div>
        },
        {title : 'DELETE' , render : exp => <div> <Link to={`/expense/delete/${exp.id}`}><MdDeleteOutline /></Link> </div>}
    ];

    return (
        <>
            {showFilter && <FilterExpense
                expenseTypes={ expenseTypes }
                paymentModes = { paymentModes }
                accounts = {accounts}
                applyFilter={applyFilter}
                resetFilter={resetFilter}
                months={months}
                years={years}
            />}
            <a href="#" className="link-primary" onClick={toggleFilter}>{filterTitle}</a>
            <TotalExpense modifiedExpenses={modifiedExpenses}/>
            <Table data={ modifiedExpenses }  configs={ configs }/>
        </>
    )
}

export default ExpenseList;