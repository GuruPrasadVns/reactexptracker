import axios from "axios";

const fetchAllBalances = async (setIsError, setErrorMessage)=>{
    try{
        const response = await axios.get('http://localhost:3001/balances');
        return response.data;
    }catch (e) {
        setIsError(true);
        setErrorMessage(`Error in fetching backend data ${e.message}`)
    }
}

const addBalance = async (balance)=>{
    const response = await axios.post('http://localhost:3001/balances',{
        ...balance
    });
    setBalances([...balances, response.data]);
}

const updateBalanceById = async (balance, balanceId) =>{
    const response = await axios.put(`http://localhost:3001/balances/${balanceId}`,{
        ...balance
    });
    const updatedBalance = balances.map(bal =>{
        if(bal.id === parseInt(balanceId))
            return {...bal, ...response.data };
        return bal;
    });
    setBalances(updatedBalance);
}

const deleteBalanceById= async (balanceId)=>{
    await axios.delete(`http://localhost:3001/balances/${balanceId}`);
    const updatedBalance = balances.filter(bal => bal.id !== parseInt(balanceId));
    setBalances(updatedBalance);
}

export { fetchAllBalances }