const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName:{
        type:String,
        minlength: [5, 'Product name must have at least 5 characters'],
        required:[true,'this field is required'],
        unique:[true,'product name must be unqiue ']
    },
    age:{
        type:String,
       
        // enum:{
        //     values: ['6+','12+','16+','18+'],
        // message:'possible values 6+,12+,16+,18+'}
    },
    type:{
      type:String,
      required:[true,'type is required'],
      enum:{
        values: ['book','figure','dice'],
    message:'possible values book, figure, dice'}
    },
    players: {
        type: String,
        
      },
      language: {
        type: String,
    
      },
      description: {
        type: String,
       
      },
      genre: {
        type: String,
       
      },
      price: {
        type: Number,
        required: [true, 'Price is required']
      },
      pages: {
        type: Number,
       
      },
      cover: {
        type: String,
     
      },
      format: {
        type: String,
       
      },
      print: {
        type: String,
       
      },
      ratingsAverage:{
        type:Number,
        min: [1, 'minimal value is 1'],
        max: [5,'maximal value is 5']
      }
    });


const Product = mongoose.model('Product',productSchema);
module.exports = Product