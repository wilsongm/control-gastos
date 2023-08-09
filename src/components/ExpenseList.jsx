import Expense from "./Expense";

const ExpenseList = ({
  expenses,
  setExpenseEdit,
  deleteExpense,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      { 
        filtro ? (
          <>
            <h2>{gastosFiltrados.length ? "Gastos" : "No Hay Gastos en esta categoria"}</h2>
              {gastosFiltrados.map((expense) => (
                  <Expense
                    key={expense.id}
                    expense={expense}
                    setExpenseEdit={setExpenseEdit}
                    deleteExpense={deleteExpense}
                  />
                ))}
          </>
          
        ): (
          <>
            <h2>{expenses.length ? "Gastos" : "No Hay Gastos aún"}</h2>
            { expenses.map((expense) => (
                <Expense
                  key={expense.id}
                  expense={expense}
                  setExpenseEdit={setExpenseEdit}
                  deleteExpense={deleteExpense}
                />
              ))}
          </>
        
        )
      }
    </div>
  );
};

export default ExpenseList;
