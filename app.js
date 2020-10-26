const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const route = require('./routes/router')

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use('/', route)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Void', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false} , (err) => {
    if(!err) console.log('Connected to the database...')
    else{
        console.log(err)
    }
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

app.listen(PORT, () => {console.log(`Server up and running on port: ${PORT}`)})