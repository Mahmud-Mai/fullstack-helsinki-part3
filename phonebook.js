const express = require("express");
const app = express();

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    return res.send('<h1>My phonebook server is working!</h1>')
  })

app.get('/api/persons', (req, res) => {
    res.send(persons)
})
  
  let entryNo = 0;
  persons.length > 0 ? persons.map(per => entryNo++) : 0

app.get('/info', (req, res) => {
    res.send("Phonebook has info for " + entryNo + " people. " + Date().toLocaleString() )
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(pers => pers.id === id)
  return person ? res.send(person) : res.status(404).end()
})


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})