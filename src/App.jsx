import { useState, useEffect } from "react"
import Header from "./components/Header"
import Filters from "./components/Filters"
import ExpenseList from "./components/ExpenseList"
import Modal from "./components/Modal"
import { generlId } from "./helpers/index"
import NewExpensesIcon from "./img/nuevo-gasto.svg"


function App() {

  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) ?? [])

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget') ?? 0 )
  )
  const [isValidBudget, setIsValidBudget] = useState(false)

  const [modal, setModal] = useState(false)
  const [animalmodal, setAnimalModal] = useState(false)

  const [expenseEdit, setExpenseEdit] = useState({})

  const [ filtro, setFiltro] = useState('')
  const [ gastosfiltrados, setGastosfiltrados] = useState([])
  

  // ----------------------se ejecuta cuando deslizamos a editar
  useEffect(() =>{
    // ------------------verifica que gasto editar tenga algo si tiene se ejecuta el modal
    if(Object.keys(expenseEdit).length > 0){
      setModal(true)

      setTimeout(() => {
        setAnimalModal(true)
      }, 500);
    }
  },[expenseEdit])
   // --------------------------almacenar presupuesto 
  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  // -----------------------------almacenar Gastos
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  // --------------------------------filtrar gastos por categoria
  useEffect(() => {
      if(filtro) {
        const gastosFiltrados = expenses.filter(expense => expense.category ===
          filtro)

          setGastosfiltrados(gastosFiltrados)
      }
  }, [filtro])

  useEffect(() => {
    //-----------------------------LS localStorage
      const budgetLS = Number(localStorage.getItem('budget')) ?? 0

      if(budgetLS > 0){
        setIsValidBudget(true)
      }
  }, [])

  const handleNewExpenses = () => {
    setModal(true)
    setExpenseEdit({})

    setTimeout(() => {
      setAnimalModal(true)
    }, 500);
  }

  const saveExpense = expense =>{

    if(expense.id){
      //----------------------------UpDate
        const upDateExpense = expenses.map( expenseState => expenseState.id === expense.id 
          ? expense : expenseState)
          setExpenses(upDateExpense)
          setExpenseEdit({})
    }else{
      //---------------------------New Expense
      expense.id = generlId()
      expense.fecha = Date.now()
        setExpenses([...expenses, expense])
    }


        setAnimalModal(false)
        setTimeout(() => {
         setModal(false) 
        }, 500);
  }

  const deleteExpense = id => {
    const expenseUdDate= expenses.filter( expense => expense.id !== id)
    setExpenses(expenseUdDate)
  }


  return (
    <div className={modal ? 'fijar': ''}>
       <Header 
          expenses={expenses}
          setExpenses={setExpenses}
          budget={budget}
          setBudget={setBudget}
          isValidBudget={isValidBudget}
          setIsValidBudget={setIsValidBudget}
       />
        {isValidBudget && (
          <>
            <main>
                <Filters 
                  filtro={filtro}
                  setFiltro={setFiltro}
                />
                <ExpenseList 
                  expenses={expenses}
                  setExpenseEdit={setExpenseEdit}
                  deleteExpense={deleteExpense}
                  filtro={filtro}
                  gastosFiltrados={gastosfiltrados}
                />
            </main>
          
            <div className="nuevo-gasto">
              <img 
                src={NewExpensesIcon} 
                alt="New Expenses Icon"
                onClick={handleNewExpenses}
              />
            </div>


          </>
        )}
       
       {modal && <Modal 
                    setModal={setModal}
                    animalmodal={animalmodal}
                    setAnimalModal={setAnimalModal}
                    saveExpense={saveExpense}
                    expenseEdit={expenseEdit}
                    setExpenseEdit={setExpenseEdit}
                  />
        }
    </div>
  )
}

export default App
