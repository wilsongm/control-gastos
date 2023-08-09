import { 
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
 } from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"
import { formatearFecha } from "../helpers/index"



import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import iconoSuscripciones from '../img/icono_suscripciones.svg'

const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: iconoSuscripciones
}

 
const Expense = ({expense, setExpenseEdit, deleteExpense}) => {
    const {category, name, amount, id, fecha } = expense


    const LeadingActionsNode = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setExpenseEdit(expense)}>
                Edit
            </SwipeAction>
        </LeadingActions>
    )

    const TrailingActionsNode = () => (
        <TrailingActions>
            <SwipeAction onClick={() => 
                            deleteExpense(id)}
                            destructive={true}
                            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )

    
  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={<LeadingActionsNode />}
            trailingActions={<TrailingActionsNode />}
        >

            <div className="gasto sombra">
                <div className="contenido-gasto">
                    <img 
                        src={diccionarioIconos[category]}
                        alt="Iconos Gastos" 
                    
                    />
                    <div className="descripcion-gasto">
                        <p className="categoria"> {category}</p>
                        <p className="nombre-gasto">{name}</p>
                        <p className="fecha-gasto">
                            Agregado el: {''}
                            <span>{formatearFecha(fecha)}</span>
                        </p>
                    </div>
                </div>
                <p className="cantidad-gasto">${amount}</p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense
