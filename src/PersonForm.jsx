import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { ALL_PERSONS } from './App.jsx'

const CREATE_PERSON = gql`
    mutation createPersons($name: String!, $street: String!, $city: String!, $phone: String!) {
        addPerson(
            name: $name
            street: $street
            city: $city
            phone: $phone
        ) {
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

export const PersonForm = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [ createPerson ] = useMutation(CREATE_PERSON, {
        refetchQueries: [ { query: ALL_PERSONS }]
    })

    const handleSumbit = (e) => {
        e.preventDefault()

        createPerson({ variables: { name, phone, street, city } })

        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }

    return (
        <div class="form-container">
            <h2>create new</h2>
            <form onSubmit={handleSumbit}>
                <div>
                <label for="name">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={evt => setName(evt.target.value)} />
                </div>
                <div>
                <label for="phone">Phone</label>
                <input type="text" id="phone" name="phone" value={phone} onChange={evt => setPhone(evt.target.value)} />
                </div>  
                <div>
                <label for="city">City</label>
                <input type="text" id="city" name="city" value={city} onChange={evt => setCity(evt.target.value)} />
                </div>
                <div>
                <label for="street">Street</label>
                <input type="text" id="street" name="street" value={street} onChange={evt => setStreet(evt.target.value)} />
                </div>
                <button type='submit'>add!</button>
            </form>
        </div> 
    )
}