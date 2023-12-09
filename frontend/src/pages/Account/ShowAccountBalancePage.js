import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "../../components/generic/Header";
import AccountBalanceList from "../../components/Account/AccountBalanceList";
import AccountBalanceForm from "../../components/Account/AccountBalanceForm";

function ShowAccountBalancePage({ accounts, balances, onSubmit }){
    const [accountName, setAccountName] = useState('');
    const { accountId } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
            const account = accounts.find(acc => acc.id === parseInt(accountId));
            if(account){
                setAccountName(account.name);
            }else{
                navigate("/accounts");
            }
    },[]);

    const accountBalances = balances.filter(bal => bal.account === accountName);

    const accountFormTitle = "Add Account Balance";
    const formClassName = "border border-primary p-4 my-2 rounded-1";

    return (
        <>
            <Header/>
            <div className="container">
                <AccountBalanceForm
                    title={accountFormTitle}
                    formClassName={formClassName}
                    accountName={accountName}
                    onSubmit = {onSubmit}
                    accountId = {accountId}
                />
                <AccountBalanceList accountBalances={accountBalances} accountId={accountId}/>
            </div>
        </>
    )
}

export default ShowAccountBalancePage;