const express = require('express')

const UserRoutes = require('../routes/UserRoutes')

const connectDb = require('../database/db')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).json({
    msg: 'The server is correctly set and the code is properly working'
  })
})

app.use('/api/users', UserRoutes)

const switchOnServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`The server is running @PORT ${PORT}`)
  })
}
switchOnServer()
