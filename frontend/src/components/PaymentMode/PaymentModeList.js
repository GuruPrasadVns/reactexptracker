import {Link} from "react-router-dom";
import {CiEdit} from "react-icons/ci";
import {MdDeleteOutline} from "react-icons/md";
import Table from "../generic/Table";

function PaymentModeList({ paymentModes }){
    if(paymentModes.length === 0) return null;

    const configs = [
        { title : 'NAME', render : acc => acc.name.toUpperCase() },
        { title : 'DESCRIPTION', render : acc=> acc.description.toUpperCase() },
        {title : 'EDIT' , render : acc => <div> <Link to={`/paymentmode/edit/${acc.id}`}><CiEdit /></Link></div>
        },
        {title : 'DELETE' , render : acc => <div> <Link to={`/paymentmode/delete/${acc.id}`}><MdDeleteOutline /></Link> </div>}
    ];

    return <Table data={ paymentModes }  configs={ configs }/>
}

export default PaymentModeList;