import { useReducer, useEffect, useMemo } from "react"
import { activityReducer,initialState } from "./reducers/activity-reducer"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { ChakraProvider } from '@chakra-ui/react'
import {
  useDisclosure,
} from '@chakra-ui/react'
import CalorieTracker from "./components/CalorieTracker"


function App() {
 const[state, dispatch]= useReducer(activityReducer,initialState)
 const { isOpen, onOpen, onClose } = useDisclosure()

 useEffect(()=>{
  localStorage.setItem('activities', JSON.stringify(state.activities))
 },[state.activities])

 const CanRestartApp=()=>useMemo(()=> state.activities.length > 0,[state.activities])

  return (
    <>
    <ChakraProvider>
        <header className="bg-purple-800 py-3">
          <div className=" max-w-4xl mx-auto flex justify-between items-center">
            <ActivityList
              activities={state.activities}
              dispatch={dispatch}
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
            />
            <h1 className="text-center text-lg font-bold text-white uppercase">
              Contador de Calorias
            </h1>

            <button className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
              disabled={!CanRestartApp()}
              onClick={()=>dispatch({type:'restart-app'})}
            >
              Reiniciar App
            </button>
            <div>

            </div>
          </div>
        </header>

        <section className="bg-purple-700 py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <Form
              dispatch={dispatch}
              state={state}
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
            />
          </div>
        </section>

        <section className="bg-gray-800 p-10">
          <div className="max-w-4xl mx-auto">
            <CalorieTracker 
              activities={state.activities}
            />
          </div>
        </section>
      </ChakraProvider>
    </>
  )
}

export default App
