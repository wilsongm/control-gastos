import { useState, useEffect } from "react"
import Message from "./Message"
import CloseBtn from "../img/cerrar.svg"
 
const Modal = ({
    setModal, 
    animalmodal, 
    setAnimalModal, 
    saveExpense,
    expenseEdit,
    setExpenseEdit
    
}) => {
    
    const [message, setMessage] = useState('')

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [fecha , setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() =>{
        if(Object.keys(expenseEdit).length > 0){
            setName(expenseEdit.name)
            setAmount(expenseEdit.amount)
            setCategory(expenseEdit.category)
            setId(expenseEdit.id)
            setFecha(expenseEdit.fecha)

        }
    }, [])


    const hiddinModal = () =>{
        
        setAnimalModal(false)
        setExpenseEdit({})
        
        setTimeout(() => {
         setModal(false) 
        }, 500);
     }

     const handleSubmit = e =>{
        e.preventDefault()

        if([name, amount, category].includes('')){
           setMessage('Todos los campos son obligatorios')

           setTimeout(() => {
                setMessage('')
           }, 2000);
           return
        }
        saveExpense({name, amount, category, id, fecha})
     }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={CloseBtn}
                alt="Close Modal"
                onClick={hiddinModal}
            />
        </div>

        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animalmodal ? "animar" : 'cerrar'}`}>
            
            
            <legend>{expenseEdit.name ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {message && <Message tipo="error">{message}</Message>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                    id="nombre"
                    type="text" 
                    placeholder="Añade el Nombre del Gasto"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    id="nombre"
                    type="number" 
                    placeholder="Añade la Cantidad del Gasto ej. 300"
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                />
            </div>
            <div className="campo">
                <label htmlFor="categoria">Categoria</label>

                <select 
                    id="categoria"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input 
                type="submit" 
                value={expenseEdit.name ? 'Guardar Cambios' : 'Añadir Gasto'}
            />
        </form>
    </div>
  )
}

export default Modal
