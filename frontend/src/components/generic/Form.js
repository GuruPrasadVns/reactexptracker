import { CiCirclePlus, CiEdit, CiFilter } from "react-icons/ci";
import { MdDeleteOutline} from "react-icons/md";
function Form({title, children, className, errorMessage, isError, onSubmit, onReset}){
    let icon = null;
    if(title.toLowerCase().includes("add")){
        icon = <CiCirclePlus style={{fontSize: '30px', marginRight: '5px'}}/>
    }else if(title.toLowerCase().includes("edit")){
        icon = <CiEdit style={{fontSize: '30px', marginRight: '5px'}}/>
    }else if(title.toLowerCase().includes("delete")){
        icon = <MdDeleteOutline style={{fontSize: '30px', marginRight: '5px', color:'red'}}/>
    }else if(title.toLowerCase().includes("filter")){
        icon = <CiFilter style={{fontSize: '30px', marginRight: '5px'}}/>
    }
    return <div className={className}>
        <div><h5>{icon}{title}</h5></div>
        <hr/>
        { isError && <div className="d-flex flex-row-reverse">
            <div className="p-2 m-2 text-danger"><b><sup>*</sup> {errorMessage}</b></div>
        </div> }

        <form onSubmit={onSubmit} onReset={onReset}>
            {children}
        </form>
    </div>
}

export default Form;