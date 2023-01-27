require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
// const { Sequelize } = require('sequelize')
const config = require('./config/config')
 
const app = express()
app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)
console.log("hello:", process.env.VUE_APP_URL)

// sequelize.sync({force: true}) //con esto limpio la base de datos, peligroso si lo dejas para produccion
sequelize.sync()
.then(()=> { 
    // app.listen(process.env.PORT || 8081)
    app.listen(config.port)

    console.log(`server started on port ${config.port}`)
})


 // const authRoutes = requiere('./routes/auth')
// app.use((error, req, res, next) => {
//     console.log(error)
//     const status = error.statusCode || 500
//     const message = error.message
//     const data = error.data
//     res.status(status).json({message: message, data: data})
// })

// app.use('/auth', authRoutes)
// // app.use((req, res, next) => {
// //     console.log("in the middleware!!!!")
// //     next() // si no lo ponemos no mira otros middlewares. el next permite que continue al siguiente middleware
// // })


// app.listen(8080)
