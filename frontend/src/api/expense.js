import axios from "axios";

const addExpenseTest = async (expenses, setExpenses, setModifiedExpenses, expense)=>{
  const response = await axios.post('http://localhost:3001/expenses',{
      ...expense
  });
  const updatedExpenses = [...expenses, response.data];
  setExpenses(updatedExpenses);
  const currentMonthsExpense = updatedExpenses.filter(expense => new Date(expense.date).getMonth() === new Date().getMonth());
  setModifiedExpenses(currentMonthsExpense);
}

export { addExpenseTest };