import { useEffect, useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import graphql from './assets/graphql.svg'
import './App.css'
import { gql, useQuery } from '@apollo/client'
import { Persons } from './Persons'

const ALL_PERSONS = gql`
  query {
    allPersons {
      id
      name
      phone
      address {
        street
        city
      }
    }
  }
`

function App() {
  const {data, error, loading} = useQuery(ALL_PERSONS)

  if (error) {
    return <span style='color: red'>Error: {error}</span>
  }
  return (
    <>
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
        </>
      )}
    </>
  )
}

export default App
