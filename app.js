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
        res.render('viewCustomers', { details: allCustomers });
    } catch (error) {
        console.log(error);
    }
})

//post create
app.post('/form', (req, res)=>{
    const customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        iceCream: req.body.iceCream
    })
    async foundCustomer = await Customer.findOne({ firstName: customer.firstName }, (err, existingCustomer) => {
        if (err) {
          // Handle the error
          res.status(500).json({ error: 'Internal server error' });
        } else if (existingCustomer) {
          // A customer with the same email already exists
          // You can send an error response or take other appropriate action
          res.status(400).json({ error: 'Customer with the same email already exists' });
        } else {
          const newCustomer = customer
          // Customer doesn't exist, you can add them to the database
          newCustomer.save((err) => {
            if (err) {
              // Handle the error
              res.status(500).json({ error: 'Internal server error' });
            } else {
              // Customer added successfully
              res.status(200).json({ message: 'Customer added successfully' });
              console.log(req.body) //data = the body of request
              res.sendFile(__dirname+'/public/success.html')
            }
          });
        }
      });

    // const newCustomer = customer.save()
    // console.log(req.body) //data = the body of request
    // res.sendFile(__dirname+'/public/success.html')
})



app.listen(3000, () => console.log('Server Started'))
