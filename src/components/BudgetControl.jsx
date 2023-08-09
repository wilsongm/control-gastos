import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const BudgetControl = ({
    expenses, 
    setExpenses,
    budget,
    setBudget,
    setIsValidBudget

}) => {

    const [porcentage, setPorcentage] = useState(0)
    // disponible available
    const [available, setAvailable] = useState(0)
    // gastado spent
    const [spent, setSpent] = useState(0)

    useEffect(()=>{
    //total es un acumulado y expense es una instancia de gastos itera en cada uno de los objetos
    // 0 es el valor de inicio de total
        const totalSpent = expenses.reduce( (total, expense) => expense.amount + total, 0)
       
        const totalAvailable = budget - totalSpent;

        // calcular el porcentaje gastado
        const newPorcentage = (((budget - totalAvailable) / budget ) * 100).toFixed(2)
        setAvailable(totalAvailable)
        setSpent(totalSpent)

        setTimeout(() => {
            setPorcentage(newPorcentage)
        }, 1200);
        
    }, [expenses])

    const formatAmount = (amount) =>{
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }) 
        return formatter.format(amount)
    }

    const handleResetApp = () => {
        const response = confirm('Deseas iniciar presupuesto y gastos')

        if(response){ 
            setExpenses([])
            setBudget(0)
            setIsValidBudget(false)
        }
    }
    
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
                styles={buildStyles({
                    pathColor: porcentage > 100 ? '#DC2626' : '3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentage > 100 ? '#DC2626' : '3B82F6'
                })}
                value={porcentage}
                text={`${porcentage}% Gastado`}

            />
        </div>
        <div className="contenido-presupuesto">

            <button 
                className="reset-app"
                type="button"
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto:</span> {formatAmount(budget)}
            </p>
            <p className={`${available < 0 ? 'negativo' : ''}`}>
                <span>Disponible:</span> {formatAmount(available)}
            </p>
            <p>
                <span>Gastado:</span> {formatAmount(spent)}
            </p>
        </div>
    </div>
  )
}

export default BudgetControl
