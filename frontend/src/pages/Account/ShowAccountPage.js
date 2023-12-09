import Header from "../../components/generic/Header";
import AccountForm from "../../components/Account/AccountForm";
import AccountList from "../../components/Account/AccountList";
import TotalAccountBalance from "../../components/Account/TotalAccountBalance";
function ShowAccountPage({ accounts, onSubmit, balances, expenses, accountTypes }){
    const accountFormTitle = "Add Account";
    const formClassName = "border border-primary p-4 my-2 rounded-1";

    return (
        <>
            <Header/>
            <div className="container">
                <AccountForm
                    title={accountFormTitle}
                    formClassName={formClassName}
                    accounts = {accounts}
                    onSubmit = { onSubmit }
                    accountTypes = {accountTypes}
                />
                <TotalAccountBalance accounts={ accounts } balances={ balances } expenses={expenses}/>
                <AccountList accounts={accounts} balances={ balances } expenses={expenses}/>
            </div>
        </>
    )
}

export default ShowAccountPage;