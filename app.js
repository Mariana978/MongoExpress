const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = 3000

const itemRoutes = require('./routes/productoRoutes') // Import the item routes

const app = express(); // Create an Express application
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/miBaseDeDatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB')
}).catch(err => {
  console.error('Error al conectar a MongoDB', err)
})

// Use the item routes for all requests to /api/items
app.use('/api/items', itemRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
