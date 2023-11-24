require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser') 
const mongoose = require('mongoose')
const Customer = require('./models/customerIceCream')
const ejs = require('ejs')
const customerIceCream = require('./models/customerIceCream')
const app = express() //app, instance of express

app.set('view engine', 'ejs')

//middleware
app.use(express.json()) //accept json
app.use(express.urlencoded()) //encode the data
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

//mongodb
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) =>console.error(error))
db.once('open', () => console.log('Connected to MongoDB')) 

//api routes
app.get('/taco', async (req, res)=>{
    try {
        const allCustomers = await customerIceCream.find({}).exec();
        res.json(allCustomers)
    } catch (error) {
        console.log(error)
    }
})

//post create
app.post('/form', async (req, res)=>{
  try{
    const customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        iceCream: req.body.iceCream
    })

    const existingCustomer = await Customer.findOne({ email:customer.email})

    if (existingCustomer) {
      console.log('Customer with the same email already exists')
      res.status(400).send('Customer with the same email already exists!!!')
    } 
    else {
      const newCustomer = await customer.save()
      console.log(req.body) 
      res.send('Customer Added!')
    }
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
})

app.listen(3000, () => console.log('Server Started'))
