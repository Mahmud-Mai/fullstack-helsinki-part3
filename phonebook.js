const express = require("express");
const morgan = require('morgan')
const app = express();

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
  
  //  Attempt to implement Middleware failed

  // const requestLogger = (request, response, next) => {
  //       console.log('Method: ' request.method)
  //     console.log('Path: ' request.path)
  //     console.log('body: ' request.body)
  //     console.log('---')
  //     next()
  //   }
  // app.use(requestLogger)

app.use(express.json())
app.use(morgan('tiny'))



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

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  person = persons.filter(person => person.id !== id)
  return res.status(204).end()
})

const generateId = () => {
  let id = Math.ceil(Math.random() * 100);
  return id
}


app.post('/api/persons', (req, res, next) => {
  const body = req.body
  let newContact = {}

  !body 
  ?
    res.status(400).json({
      error: 'content is missing'
    })
  :
   newContact = {
    id: generateId(),
    name: body.name === '' || null ? next('name field is empty') : body.name,
    number: body.number === '' || null ? next('name is empty') : body.number
    }

  persons = persons.concat(newContact)
  res.json(newContact) 

})


//  Attempt to implement Middleware failed

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})