import React, { useEffect, useState }from 'react'
import './App.css'
import { gql, useLazyQuery } from '@apollo/client'

const ALL_PERSONS = gql`
    query findAllPersons($nameToSearch: String!) {
        findPerson(name: $nameToSearch) {
            name
            phone
            id
            address {
                street
                city
            }
        }
    }
`

export const Persons = ({persons}) => {

    const [getPerson, result] = useLazyQuery(ALL_PERSONS)
    const [person, setPerson] = useState(null)

    console.log('Persons', person) 

    const showPerson = name => {
        getPerson({ variables: { nameToSearch: name } })
    }

    useEffect(() => {
        if (result.data) {
            setPerson(result.data.findPerson)
        }
    }, [result])

    if (person) {
        return (
        <div className="person-details">
            <h2>{person.name}</h2>
            <div>{person.address.street}, {person.address.city}</div>
            <div>{person.phone}</div>
            <button onClick={() => setPerson(null)}>close</button>
        </div>
        )
    }

    if (persons === null) return null
    return (
        <div className="grid-container">
            {persons.map(person => (
                <div className='grid-item' key={person.id} onClick={() => {showPerson(person.name)}}>
                    <h3>{person.name}, {person.phone}</h3>
                </div>
            ))}
        </div>
    );
}