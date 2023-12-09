function Table({ data, configs }){
    if(data.length === 0) return null;

    const renderHeader = configs.map((item,index) =>{
        return  <th scope="col" key={index}>{item.title.toUpperCase()}</th>;
    });

    const renderRows = data.map((item, index)=>{

        const renderRow = configs.map((config, configIndex)=>{
            return <td key={configIndex}>{config.render(item)}</td>
        });

        return <tr key={index}>
            <th scope="row">{index + 1}</th>
            {renderRow}
        </tr>
    });

    return (
        <table className="table table-hover mt-5">
            <thead>
            <tr>
                <th scope="col">#</th>
                {renderHeader}
            </tr>
            </thead>
            <tbody>
                {renderRows}
            </tbody>
        </table>
    )
}

export default Table;