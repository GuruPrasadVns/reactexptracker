import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "../../components/generic/Header";
import AccountBalanceForm from "../../components/Account/AccountBalanceForm";

function DeleteAccountBalancePage({ accounts, onSubmit, balances }){
    const [accountName, setAccountName] = useState('');
    const { accountId, balanceId } = useParams();
    const accountFormTitle = "Delete Account Balance";
    const formClassName = "border border-danger p-4 my-2 rounded-1";
    const navigate = useNavigate();

    useEffect(()=>{
        const account = accounts.find(acc => acc.id === parseInt(accountId));
        if(account){
            setAccountName(account.name);
        }else{
            navigate(`/account/balance/${accountId}`);
        }
    },[]);

    return <>
        <Header/>
        <div className="container">
            <AccountBalanceForm
                title={accountFormTitle}
                formClassName={formClassName}
                isDelete
                accountName={accountName}
                onSubmit = {onSubmit}
                accountId = {accountId}
                balanceId = { balanceId }
                accounts={accounts}
                balances={balances}
            />
        </div>
    </>
}

export default DeleteAccountBalancePage;