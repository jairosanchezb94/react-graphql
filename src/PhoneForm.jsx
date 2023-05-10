import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from './persons/mutations'

export const PhoneForm = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [ createPhone ] = useMutation(EDIT_NUMBER)

    const handleSumbit = (e) => {
        e.preventDefault()

        createPhone({ variables: { name, phone } })

        setName('')
        setPhone('')
    }

    return (
        <div class="form-container">
            <h2>create new phone</h2>
            <form onSubmit={handleSumbit}>
                <div>
                <label for="name">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={evt => setName(evt.target.value)} />
                </div>
                <div>
                <label for="phone">Phone</label>
                <input type="text" id="phone" name="phone" value={phone} onChange={evt => setPhone(evt.target.value)} />
                </div>  
                <button type='submit'>add phone</button>
            </form>
        </div> 
    )
}