import Label from "../generic/Label";
import Select from "../generic/Select";
import {useState} from "react";
import Input from "../generic/Input";
import Form from "../generic/Form";
import Button from "../generic/Button";

function FilterExpense({ expenseTypes, paymentModes, accounts, months, years , applyFilter, resetFilter}){
    const [expenseDate, setExpenseDate] = useState('');
    const [expenseType, setExpenseType] = useState('');
    const [expenseMonth, setExpenseMonth] = useState('');
    const [expenseYear, setExpenseYear] = useState('');
    const [expenseMode, setExpenseMode] = useState('');
    const [expenseAccount, setExpenseAccount] = useState('');

    const handleExpenseDateChange = event =>{
        setExpenseDate(event.target.value);
    }

    const handleExpenseMonthChange = event =>{
        setExpenseMonth(event.target.value);
    }

    const handleExpenseYearChange = event =>{
        setExpenseYear(event.target.value);
    }

    const handleExpenseTypeChange = event =>{
        setExpenseType(event.target.value);
    }

    const handleExpenseModeChange = event =>{
        setExpenseMode(event.target.value);
    }

    const handleExpenseAccountChange = event =>{
        setExpenseAccount(event.target.value);
    }

    const resetExpenseFilterFormValues = ()=>{
        setExpenseDate('');
        setExpenseMonth(0);
        setExpenseYear(0);
        setExpenseType(0);
        setExpenseAccount(0);
        setExpenseMode(0);
    }

    const handleExpenseFilterFormReset = e =>{
        e.preventDefault();
        resetFilter();
        resetExpenseFilterFormValues();
    }

    const handleExpenseFilterFormSubmit = e =>{
        e.preventDefault();
        applyFilter(expenseDate, expenseMonth, expenseYear,expenseType, expenseAccount, expenseMode);
        resetExpenseFilterFormValues();
    }
    const formClassName = "border border-primary p-4 my-2 rounded-1";

    return (
        <Form title="Filter" className={formClassName} onSubmit={handleExpenseFilterFormSubmit}
              onReset={handleExpenseFilterFormReset}>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Label title="Date" htmlFor="expenseDate" />
                        <Input type="date" id="expenseDate" value={expenseDate}
                               onChange={handleExpenseDateChange}
                               
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="Month" htmlFor="expenseMonth" />
                        <Select items={months} id="expenseMonth"
                                title="Select Expense Month"
                                value={expenseMonth}
                                onChange={handleExpenseMonthChange}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="Year" htmlFor="expenseYear" />
                        <Select items={years} id="expenseYear"
                                title="Select Expense Year"
                                value={expenseYear}
                                onChange={handleExpenseYearChange}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Label title="Expense Type" htmlFor="expenseType" />
                        <Select items={expenseTypes} id="expenseType"
                                title="Select Expense Type"
                                value={expenseType}
                                onChange={handleExpenseTypeChange}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="From Account" htmlFor="expenseAccount" />
                        <Select items={accounts} id="expenseAccount" title="Select Account"
                                value={expenseAccount}
                                onChange={handleExpenseAccountChange}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Label title="Expense Mode" htmlFor="expenseMode" />
                        <Select items={paymentModes} id="expenseMode" title="Select Payment Mode"
                                value={expenseMode}
                                onChange={handleExpenseModeChange}
                        />
                    </div>
                </div>
            </div>
            <Button type={"submit"} className={"btn btn-primary"} title="Submit"/>
            <Button type={"reset"} className={"btn btn-secondary"} title="Reset" style={{marginLeft: '5px'}}/>
        </Form>
    )
}

export default FilterExpense;