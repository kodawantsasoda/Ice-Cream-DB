const mongoose = require('mongoose') //creating a model to interact with database


const customerIceCreamSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    iceCream: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('customerIceCream', customerIceCreamSchema)