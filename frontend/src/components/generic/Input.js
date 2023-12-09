function Input({type, id, required, value, onChange, disabled}){
    return <input type={type}
                  className="form-control"
                  id={id}
                  required={required}
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
    />
}

export default Input;