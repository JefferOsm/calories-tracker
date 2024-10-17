import { useReducer } from "react"
import { activityReducer,initialState } from "./reducers/activity-reducer"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { ChakraProvider } from '@chakra-ui/react'


function App() {
 const[state, dispatch]= useReducer(activityReducer,initialState)
 console.log(state)

  return (
    <>
    <ChakraProvider>
        <header className="bg-purple-800 py-3">
          <div className=" max-w-4xl mx-auto flex justify-between">
            <ActivityList
              activities={state.activities}
            />
            <h1 className="text-center text-lg font-bold text-white uppercase">
              Contador de Calorias
            </h1>
            <div>

            </div>
          </div>
        </header>

        <section className="bg-purple-700 py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <Form
              dispatch={dispatch}
            />
          </div>
        </section>
      </ChakraProvider>
    </>
  )
}

export default App
