import { useState } from "react";
import Message from "./Message";


  const NewBudget = ({ 
    budget, 
    setBudget, 
    setIsValidBudget
  }) => {


  const [message, setMassage] = useState('')
  
  const handleBudget = (e) =>{
      e.preventDefault()

    if(!budget || budget < 0){
        setMassage('Presupuesto no Valido...')
        return
    }
    setMassage('')
    setIsValidBudget(true)
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario">
        <div className="campo">
          <label htmlFor="">Definir Presuspuesto</label>

          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu Presupuesto"
            value={budget}
            onChange={e => setBudget(Number(e.target.value))}
          />
        </div>

        <input type="submit" value="Añadir" onClick={handleBudget}/>

        {message && <Message tipo="error">{message}</Message>}
      </form>
    </div>
  );
};

export default NewBudget;
