import AiIcon from "./AiIcon";
import { useNavigate } from 'react-router-dom'
function Header(){
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-light border-bottom" style={{backgroundColor: '#e3f2fd'}}>
            <div className="container-fluid">
                <button className="nav-link" onClick={()=> navigate("/")}>
                    <AiIcon iconName="AiFillExperiment" style={{fontSize: '40px'}}/>Expense Tracker
                </button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarSupportedContent">
                    <div className="p-2">
                        <button className="nav-link" onClick={()=> navigate("/accounts")}>
                            Accounts
                        </button>
                    </div>
                    <div className="p-2">
                        <button className="nav-link" onClick={()=> navigate("/paymentmodes")}>
                            Payment Modes
                        </button>
                    </div>
                    <div className="p-2">
                        <button className="nav-link" onClick={()=> navigate("/expensetypes")}>
                            Expense Types
                        </button>
                    </div>

                </div>
            </div>
        </nav>
        );
}

export default Header;