import { Dispatch, useState, useEffect } from "react"
import {v4 as uuidv4} from 'uuid'
import type { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps ={
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
    isOpen:boolean
    onClose: () => void
    onOpen: () => void
}

const initialState: Activity={
    id: uuidv4(),
    category:1,
    name:'',
    calories:0
}

function Form({dispatch, state}: FormProps) {
    const [activity, setActivity]= useState<Activity>(initialState)

    useEffect(()=>{
        if(state.activeId){
            const selectedActivity= state.activities.filter(activity=> activity.id===state.activeId)[0]
            setActivity(selectedActivity)
        }
    },[state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> )=> {
        const isNumberField= ['category', 'calories'].includes(e.target.id)
        console.log(isNumberField)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = ()=>{
        const {name,calories}= activity
        return name.trim() !=='' && calories>0
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        dispatch({type:'save-activity', payload:{newActivity:activity}})

        setActivity({
            ...initialState,
            id:uuidv4()
        })

        
    }

  return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categorias:</label>
            <select
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category=>(
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">{activity.category ===1 ? 'Comida:' : 'Actividad:'}</label>
            <input 
                type="text" 
                id="name" 
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                value={activity.name} 
                onChange={handleChange}
            />
        </div>

        
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
            <input 
                type="number" 
                id="calories" 
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Calorias. Ej. 300 o 500"
                value={activity.calories} 
                onChange={handleChange}

            />
        </div>
        <input type="submit"
            className="bg-gray-700 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
        />
    </form>
  )
}

export default Form