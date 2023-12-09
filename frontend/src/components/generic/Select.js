function Select({title, items, id, value, onChange, disabled }){
    const renderItems = items.map(item => {
        return <option value={item.id} key={item.id}>{item.name.toUpperCase()}</option>
    });
    return (
        <select className="form-select" id={id} value={value} onChange={onChange} disabled={disabled}>
            <option value="0">{title.toUpperCase()}</option>
            {renderItems}
        </select>
    )
}

export default Select;