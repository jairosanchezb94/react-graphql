import './App.css'

export const Persons = ({persons}) => {
    if (!persons) return null
    return (
        <div>
            <h1>Persons</h1>
            {persons.map(person => (
                <div className='grid-container' key={person.id}>
                    <h3>{person.name}</h3>
                    <p>{person.phone}</p>
                    <p>{person.address.street}</p>
                    <p>{person.address.city}</p>
                </div>
            ))}
        </div>
    );
}