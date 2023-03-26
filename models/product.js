const { Schema, model } = require('mongoose');

const productSchema = new Schema ({
    categories: {
        type: Array,
    },
    title:{
        type: Object
    },
    calories:{
        type: Number
    },
    groupBloodNotAllowed:{
        type: Array
    }

})
const Product = model("Product", productSchema)

module.exports= {Product}