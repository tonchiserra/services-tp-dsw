import express, { NextFunction, Request, Response } from 'express';
import { Direction } from './directions.js'
import { User } from './users.js'

const app = express();
app.use(express.json());

const users =[
    new User(
        'Guido',
        'Bitti',
        3415087210,
        'guidobitti@gmail.com',
        'GuidoBitti',
        'pa$$w0rd',
        './src/profile.jpg',
        'Mi nombre es Guido y me gusta JS'
    ) 
]

//USERS
//SANITIZER USER
function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      mail: req.body.mail,
      username: req.body.username,
      password: req.body.password,
      profileImg: req.body.profileImg,
      description: req.body.description,
    }

  
    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key]
      }
    })
    next()
}

// OBTENER TODOS LOS USERS
app.get('/api/users', (req, res) => {
  res.json({ data: users })
})

//OBTENER UN SOLO USUARIO POR userId
app.get('/api/users/:userId', (req, res) => {
    const user = users.find((user) => user.userId === req.params.userId)

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    return res.json({ data: user })
})

//CREAR NUEVO USUARIO
app.post('/api/users', sanitizeUserInput, (req, res) => {
  const input = req.body.sanitizedInput

  const user = new User(
    input.name,
    input.surname,
    input.phone,
    input.mail,
    input.username,
    input.password,
    input.profileImg,
    input.description,
  )

  users.push(user)
  return res.status(201).send({ message: 'User created', data: user })
})

//ACTUALIZAR DATOS DE UN USER CON PUT
app.put('/api/users/:userId', sanitizeUserInput, (req, res) => {
  const userIdx = users.findIndex((user) => user.userId === req.params.userId)

  if (userIdx === -1) {
    return res.status(404).send({ message: 'User not found' })
  }

  users[userIdx] = { ...users[userIdx], ...req.body.sanitizedInput }

  return res.status(200).send({ message: 'User updated successfully', data: users[userIdx] })
})

//MODIFICAR UN USER CON PATCH
app.patch('/api/users/:userId', sanitizeUserInput, (req, res) => {
  const userIdx = users.findIndex((user) => user.userId === req.params.userId)

  if (userIdx === -1) {
    return res.status(404).send({ message: 'User not found' })
  }

  Object.assign(users[userIdx], req.body.sanitizedInput)

  return res.status(200).send({ message: 'User updated successfully', data: users[userIdx] })
})

//ELIMINAR UN USUARIO
app.delete('/api/users/:userId', (req, res) => {
  const userIdx = users.findIndex((user) => user.userId === req.params.userId)

  if (userIdx === -1) {
    res.status(404).send({ message: 'User not found' })
  } else {
    users.splice(userIdx, 1)
    res.status(200).send({ message: 'User deleted successfully' })
  }
})

const directions =[
  new Direction(
      'Alvear',
      1431,
      'Argentina',
      'Rosario'
  ) 
]
//DIRECTIONS
function sanitizeDirectionInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    street: req.body.street,
    strNumber: req.body.strNumber,
    country: req.body.country,
    city: req.body.city
  }


  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

// OBTENER TODOS LOS DIRECTIONS
app.get('/api/directions', (req, res) => {
res.json({ data: directions })
})

//OBTENER UN SOLO DIRECTION POR directionId
app.get('/api/directions/:directionId', (req, res) => {
  const direction = directions.find((direction) => direction.directionId === req.params.directionId)

  if (!direction) {
    return res.status(404).send({ message: 'User not found' })
  }
  return res.json({ data: direction })
})

//CREAR NUEVO DIRECTION
app.post('/api/directions', sanitizeDirectionInput, (req, res) => {
const input = req.body.sanitizedInput

const direction = new Direction(
  input.street,
  input.strNumber,
  input.country,
  input.city
)

directions.push(direction)
return res.status(201).send({ message: 'Direction created', data: direction })
})

//ACTUALIZAR DATOS DE UN DIRECTION CON PUT
app.put('/api/directions/:directionId', sanitizeDirectionInput, (req, res) => {
const directionIdx = directions.findIndex((direction) => direction.directionId === req.params.directionId)

if (directionIdx === -1) {
  return res.status(404).send({ message: 'Direction not found' })
}

directions[directionIdx] = { ...directions[directionIdx], ...req.body.sanitizedInput }

return res.status(200).send({ message: 'Direction updated successfully', data: directions[directionIdx] })
})

//MODIFICAR UN DIRECTION CON PATCH
app.patch('/api/directions/:directionId', sanitizeDirectionInput, (req, res) => {
const directionIdx = directions.findIndex((direction) => direction.directionId === req.params.directionId)

if (directionIdx === -1) {
  return res.status(404).send({ message: 'Direction not found' })
}

Object.assign(directions[directionIdx], req.body.sanitizedInput)

return res.status(200).send({ message: 'Direction updated successfully', data: directions[directionIdx] })
})

//ELIMINAR UN DIRECTION
app.delete('/api/directions/:directionId', (req, res) => {
const directionIdx = directions.findIndex((direction) => direction.directionId === req.params.directionId)

if (directionIdx === -1) {
  res.status(404).send({ message: 'Direction not found' })
} else {
  directions.splice(directionIdx, 1)
  res.status(200).send({ message: 'Direction deleted successfully' })
}
})

//MANEJO PARA CUANDO EL RECURSO NO EXISTE
app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, ()=>{
    console.log('server running on http://localhost:3000/')
})

