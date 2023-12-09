import { FaStar } from "react-icons/fa";

function Label({htmlFor, title, required}){
    return <label htmlFor={htmlFor} className="form-label">
            <b>{title}</b>
        {required && <sup><FaStar style={{fontSize:'8px', color:'red'}}/></sup>}
    </label>
}

export default Label;