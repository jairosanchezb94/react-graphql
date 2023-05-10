import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_PERSONS } from './persons/queries'
import { CREATE_PERSON } from './persons/mutations'

export const PersonForm = ({notifyError}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [ createPerson ] = useMutation(CREATE_PERSON, {
        refetchQueries: [ { query: ALL_PERSONS }],
        onError: (error) => {
            notifyError(error.graphQLErrors[0].message)
        }
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