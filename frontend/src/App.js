import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import HomePage from "./pages/Home/HomePage";
import EditExpensePage from "./pages/Expenses/EditExpensePage";
import DeleteExpensePage from "./pages/Expenses/DeleteExpensePage";
import Header from "./components/generic/Header";
import ShowAccountPage from "./pages/Account/ShowAccountPage";
import ShowExpenseTypePage from "./pages/ExpenseType/ShowExpenseTypePage";
import EditAccountPage from "./pages/Account/EditAccountPage";
import DeleteAccountPage from "./pages/Account/DeleteAccountPage";
import EditExpenseTypePage from "./pages/ExpenseType/EditExpenseTypePage";
import DeleteExpenseTypePage from "./pages/ExpenseType/DeleteExpenseTypePage";
import ShowPaymentMode from "./pages/PaymentMode/ShowPaymentMode";
import EditPaymentModePage from "./pages/PaymentMode/EditPaymentModePage";
import DeletePaymentModePage from "./pages/PaymentMode/DeletePaymentModePage";
import ShowAccountBalancePage from "./pages/Account/ShowAccountBalancePage";
import EditAccountBalancePage from "./pages/Account/EditAccountBalancePage";
import DeleteAccountBalancePage from "./pages/Account/DeleteAccountBalancePage";


function App() {
    const [expenses, setExpenses] = useState([]);
    const [modifiedExpenses, setModifiedExpenses] = useState([]);
    const [balances, setBalances] = useState([]);
    const [paymentModes, setPaymentModes] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [months,setMonths] = useState([]);
    const [years,setYears] = useState([]);
    const [accountTypes, setAccountTypes] = useState([]);
    const [types, setTypes] = useState([]);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        try{
            fetchAllExpenses();
            fetchAllBalances();
            fetchPaymentModes();
            fetchAccounts();
            fetchExpenseTypes();
            fetchMonths();
            fetchYears();
            fetchAccountTypes();
            fetchTypes();
        }catch (e) {
            setIsError(true);
            setErrorMessage(`Error in fetching backend data`)
        }

    }, []);

    if(isError){
        return <>
            <Header/>
            <div className="container p-5 m-5">
                <div style={{width: '70rem'}} className="border border-danger p-5 m-5 rounded-1">
                    <p>{errorMessage}</p>
                </div>
            </div>
        </>
    }

    const fetchTypes = async ()=>{
        try{
            const response = await axios.get('http://localhost:3001/types');
            setTypes(response.data);
        }catch (e) {
            setIsError(true);
            setErrorMessage(`Error in fetching types ${e.message}`)
        }
    }
    const fetchAccountTypes = async ()=>{
        try{
            const response = await axios.get('http://localhost:3001/accounttypes');
            setAccountTypes(response.data);
        }catch (e) {
            setIsError(true);
            setErrorMessage(`Error in fetching account types ${e.message}`)
        }
    }
    const fetchYears = async ()=>{
        try{
            const response = await axios.get('http://localhost:3001/years');
            setYears(response.data);
        }catch (e) {
            setIsError(true);
            setErrorMessage(`Error in fetching years ${e.message}`)
        }
    }

    const fetchMonths = async ()=>{
        try{
            const response = await axios.get('http://localhost:3001/months');
            setMonths(response.data);
        }catch (e) {
            setIsError(true);
            setErrorMessage(`Error in fetching months ${e.message}`)
        }
    }
    const fetchAllBalances = async ()=>{
        try{
            const response = await axios.get('http://localhost:3001/balances');
            setBalances(response.data);
        }catch (e) {
            setIsError(true);
            setErrorMessage(`Error in fetching backend data ${e.message}`)
        }
    }

    const fetchAllExpenses = async ()=>{
        try{
            const response = await axios.get('http://localhost:3001/expenses');
            setExpenses(response.data);
            const currentMonthsExpense = response.data.filter(expense => new Date(expense.date).getMonth() === new Date().getMonth());
            setModifiedExpenses(currentMonthsExpense);
        }catch (e) {
            setIsError(true);
            setErrorMessage(`Error in fetching backend data ${e.message}`)
        }
    }

    const fetchPaymentModes = async ()=>{
        try{
            const response = await axios.get('http://localhost:3001/paymentmodes');
            setPaymentModes(response.data);
        }catch (e) {
            setIsError(true);
            setErrorMessage(`Error in fetching backend data ${e.message}`)
        }
    }

    const fetchAccounts = async ()=>{
        try{
            const response = await axios.get('http://localhost:3001/accounts');
            setAccounts(response.data);
        }catch (e) {
            setIsError(true);
            setErrorMessage(`Error in fetching backend data ${e.message}`)
        }
    }
    const fetchExpenseTypes = async ()=>{
        try{
            const response = await axios.get('http://localhost:3001/expensetypes');
            setExpenseTypes(response.data);
        }catch (e) {
            setIsError(true);
            setErrorMessage(`Error in fetching backend data ${e.message}`)
        }

    }

    const addExpense = async (expense)=>{
        const response = await axios.post('http://localhost:3001/expenses',{
            ...expense
        });
        const updatedExpenses = [...expenses, response.data];
        setExpenses(updatedExpenses);
        const currentMonthsExpense = updatedExpenses.filter(expense => new Date(expense.date).getMonth() === new Date().getMonth());
        setModifiedExpenses(currentMonthsExpense);
    }
    

    const updateExpenseById = async (expense, expenseId) =>{
        const response = await axios.put(`http://localhost:3001/expenses/${expenseId}`,{
            ...expense
        });
        const updatedExpenses = expenses.map(exp =>{
            if(exp.id === parseInt(expenseId))
                return {...exp, ...response.data };
            return exp;
        });
        setExpenses(updatedExpenses);
        const currentMonthsExpense = updatedExpenses.filter(expense => new Date(expense.date).getMonth() === new Date().getMonth());
        setModifiedExpenses(currentMonthsExpense);
    }

    const deleteExpenseById = async (expenseId)=>{
        await axios.delete(`http://localhost:3001/expenses/${expenseId}`);
        const updatedExpenses = expenses.filter(exp => exp.id !== parseInt(expenseId));
        setExpenses(updatedExpenses);
        const currentMonthsExpense = updatedExpenses.filter(expense => new Date(expense.date).getMonth() === new Date().getMonth());
        setModifiedExpenses(currentMonthsExpense);
    }

    const addAccount = async (account)=>{
        const response = await axios.post('http://localhost:3001/accounts',{
            ...account
        });
        setAccounts([...accounts, response.data]);
    }

    const updateAccountById = async (account, accountId) =>{
        const response = await axios.put(`http://localhost:3001/accounts/${accountId}`,{
            ...account
        });
        const updatedAccounts = accounts.map(acc =>{
            if(acc.id === parseInt(accountId))
                return {...acc, ...response.data };
            return acc;
        });
        setAccounts(updatedAccounts);
    }

    const deleteAccountById = async (accountId)=>{
        await axios.delete(`http://localhost:3001/accounts/${accountId}`);
        const updatedAccounts = accounts.filter(acc => acc.id !== parseInt(accountId));
        setAccounts(updatedAccounts);
    }

    const addExpenseType = async (expenseType)=>{
        const response = await axios.post('http://localhost:3001/expensetypes',{
            ...expenseType
        });
        setExpenseTypes([...expenseTypes, response.data]);
    }

    const updateExpenseTypeById = async (expenseType, expenseTypeId) =>{
        const response = await axios.put(`http://localhost:3001/expensetypes/${expenseTypeId}`,{
            ...expenseType
        });
        const updatedExpenseTypes = expenseTypes.map(expType =>{
            if(expType.id === parseInt(expenseTypeId))
                return {...expType, ...response.data };
            return expType;
        });
        setExpenseTypes(updatedExpenseTypes);
    }


    const deleteExpenseTypeById = async (expenseTypeId)=>{
        await axios.delete(`http://localhost:3001/expensetypes/${expenseTypeId}`);
        const updatedExpenseTypes = expenseTypes.filter(expType => expType.id !== parseInt(expenseTypeId));
        setExpenseTypes(updatedExpenseTypes);
    }

    const addPaymentMode = async (paymentMode)=>{
        const response = await axios.post('http://localhost:3001/paymentmodes',{
            ...paymentMode
        });
        setPaymentModes([...paymentModes, response.data]);
    }

    const updatePaymentModeById = async (paymentMode, paymentModeId) =>{
        const response = await axios.put(`http://localhost:3001/paymentmodes/${paymentModeId}`,{
            ...paymentMode
        });
        const updatedPaymentModes = paymentModes.map(payMode =>{
            if(payMode.id === parseInt(paymentModeId))
                return {...payMode, ...response.data };
            return payMode;
        });
        setPaymentModes(updatedPaymentModes);
    }

    const deletePaymentModeById = async (paymentModeId)=>{
        await axios.delete(`http://localhost:3001/paymentmodes/${paymentModeId}`);
        const updatedPaymentModes = paymentModes.filter(payMode => payMode.id !== parseInt(paymentModeId));
        setPaymentModes(updatedPaymentModes);
    }

    const addBalance = async (balance)=>{
        const response = await axios.post('http://localhost:3001/balances',{
            ...balance
        });
        setBalances([...balances, response.data]);
    }

    const updateBalanceById = async (balance, balanceId) =>{
        const response = await axios.put(`http://localhost:3001/balances/${balanceId}`,{
            ...balance
        });
        const updatedBalance = balances.map(bal =>{
            if(bal.id === parseInt(balanceId))
                return {...bal, ...response.data };
            return bal;
        });
        setBalances(updatedBalance);
    }

    const deleteBalanceById= async (balanceId)=>{
        await axios.delete(`http://localhost:3001/balances/${balanceId}`);
        const updatedBalance = balances.filter(bal => bal.id !== parseInt(balanceId));
        setBalances(updatedBalance);
    }

    const applyFilter = (date, month, year, expenseType, account, paymentMode)=>{
        if(!date && !month && !year && !expenseType && !account && !paymentMode){
            resetFilter();
            return;
        }
        let filteredExpense = [...expenses];

        if(filteredExpense.length > 0 && date){
            filteredExpense = filteredExpense.filter(expense => expense.date=== date);
        }

        if(filteredExpense.length > 0 && (month && typeof month !== 'number')){
            filteredExpense = filteredExpense.filter(expense => new Date(expense.date).getMonth() === parseInt(month) - 1);

        }
        if(filteredExpense.length > 0 && (year && typeof year !== 'number')){
            const selectedYear = years.find(yr => yr.id === parseInt(year));
            filteredExpense = filteredExpense.filter(expense => new Date(expense.date).getFullYear() === parseInt(selectedYear.name));
        }
        if(filteredExpense.length > 0 && (expenseType && typeof expenseType !== 'number')){
            const selectedExpenseType = expenseTypes.find(expType => expType.id === parseInt(expenseType));
            filteredExpense = filteredExpense.filter(expense => expense.type === selectedExpenseType.name);
        }
        if(filteredExpense.length > 0 && (account && typeof account !== 'number')){
            const selectedAccount = accounts.find(acc => acc.id === parseInt(account));
            filteredExpense = filteredExpense.filter(expense => expense.account === selectedAccount.name);
        }
        if(filteredExpense.length > 0 && (account && typeof account !== 'number')){
            const selectedAccount = accounts.find(acc => acc.id === parseInt(account));
            filteredExpense = filteredExpense.filter(expense => expense.account === selectedAccount.name);
        }
        if(filteredExpense.length > 0 && (paymentMode && typeof paymentMode !== 'number')){
            const selectedPaymentMode = paymentModes.find(payMode => payMode.id === parseInt(paymentMode));
            filteredExpense = filteredExpense.filter(expense => expense.mode === selectedPaymentMode.name);
        }

        setModifiedExpenses(filteredExpense);

    }

    const resetFilter = () =>{
        const currentMonthsExpense = expenses.filter(expense => new Date(expense.date).getMonth() === new Date().getMonth());
        setModifiedExpenses(currentMonthsExpense);
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage
                        paymentModes={ paymentModes}
                        accounts={accounts}
                        expenseTypes = {expenseTypes}
                        onSubmit={addExpense}
                        modifiedExpenses={modifiedExpenses}
                        applyFilter={applyFilter}
                        resetFilter={resetFilter}
                        months={months}
                        years = {years}
                        expenses={expenses}

            />
        },
        {
            path: "/expense/edit/:expenseId",
            element: <EditExpensePage
                paymentModes={ paymentModes}
                accounts={accounts}
                onSubmit={ updateExpenseById }
                expenseTypes = {expenseTypes}
                expenses={expenses}
            />
        },
        {
            path: "/expense/delete/:expenseId",
            element: <DeleteExpensePage
                paymentModes={ paymentModes}
                accounts={accounts}
                onSubmit={ deleteExpenseById }
                expenseTypes = {expenseTypes}
                expenses={expenses}
            />
        },
        {
            path: "/accounts",
            element: <ShowAccountPage
                accounts={accounts}
                balances = { balances }
                expenses = { expenses }
                accountTypes = {accountTypes}
                onSubmit={ addAccount }
            />
        },
        {
            path: "/account/edit/:accountId",
            element: <EditAccountPage
                accounts={accounts}
                onSubmit={ updateAccountById }
                accountTypes = {accountTypes}
            />
        },
        {
            path: "/account/delete/:accountId",
            element: <DeleteAccountPage
                accounts={accounts}
                onSubmit={ deleteAccountById }
                accountTypes = {accountTypes}
            />
        },
        {
            path: "/expensetypes",
            element: <ShowExpenseTypePage
                expensetypes={expenseTypes}
                onSubmit={ addExpenseType }
            />
        },
        {
            path: "/expensetype/edit/:expenseTypeId",
            element: <EditExpenseTypePage
                expenseTypes = {expenseTypes}
                onSubmit={ updateExpenseTypeById }
            />
        },
        {
            path: "/expensetype/delete/:expenseTypeId",
            element: <DeleteExpenseTypePage
                expenseTypes = {expenseTypes}
                onSubmit={ deleteExpenseTypeById }
            />
        },
        {
            path: "/paymentmodes",
            element: <ShowPaymentMode
                paymentModes={paymentModes}
                onSubmit={ addPaymentMode }
            />
        },
        {
            path: "/paymentmode/edit/:paymentModeId",
            element: <EditPaymentModePage
                paymentModes = {paymentModes}
                onSubmit={ updatePaymentModeById }
            />
        },
        {
            path: "/paymentmode/delete/:paymentModeId",
            element: <DeletePaymentModePage
                paymentModes = {paymentModes}
                onSubmit={ deletePaymentModeById }
            />
        },
        {
            path: "/account/balance/:accountId",
            element: <ShowAccountBalancePage
                accounts={accounts}
                balances = {balances}
                types={types}
                onSubmit = { addBalance }
            />
        },
        {
            path: "/account/balance/edit/:accountId/:balanceId",
            element: <EditAccountBalancePage
                accounts={accounts}
                balances = {balances}
                onSubmit = { updateBalanceById }
            />
        },
        {
            path: "/account/balance/delete/:accountId/:balanceId",
            element: <DeleteAccountBalancePage
                accounts={accounts}
                balances = {balances}
                onSubmit = { deleteBalanceById }
            />
        },
    ]);
  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;
