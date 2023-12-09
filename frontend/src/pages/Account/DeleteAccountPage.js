import {useParams} from "react-router-dom";
import Header from "../../components/generic/Header";
import AccountForm from "../../components/Account/AccountForm";

function DeleteAccountPage({ accounts, onSubmit, accountTypes }){
    const { accountId } = useParams();
    const accountFormTitle = "Delete Account";
    const formClassName = "border border-danger p-4 my-2 rounded-1";
    return <>
        <Header/>
        <div className="container">
            <AccountForm
                title={accountFormTitle}
                formClassName={formClassName}
                isDelete
                accountId={accountId}
                accounts = {accounts}
                onSubmit={ onSubmit }
                accountTypes = {accountTypes}
            />
        </div>
    </>
}

export default DeleteAccountPage;