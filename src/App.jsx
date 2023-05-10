import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import graphql from './assets/graphql.svg'
import './App.css'
import { Persons } from './Persons'
import { PersonForm } from './PersonForm'
import { usePersons } from './persons/custom-hooks'
import { Notify } from './Notify'
import { PhoneForm } from './PhoneForm'

function App() {
  const { loading, error, data } = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)

  if (error) return <span style='color: red'>Error: {error}</span>
  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  
  return (
    <>
      <Notify errorMessage={errorMessage} />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://graphql.org/" target="_blank">
          <img src={graphql} className="logo" alt="GraphQL logo" />
        </a>
      </div>
      {loading 
      ? <span>Loading...</span>
      : (
        <>
          <h1>Vite + React + GraphQL</h1>
          <Persons persons={data?.allPersons} />
          <PhoneForm />
        </>
      )}
      <PersonForm notifyError={notifyError}/>
    </>
  )
}

export default App
