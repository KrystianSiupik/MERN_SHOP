const Product = require('./../models/productModel')

exports.getProducts = async(req,res,next)=>
{
    try {
        const product = await Product.find();
        if(!product)
        {
            res.status(401).json({
                staus:'failed',
                message:'no products found'
               }) 
        }
        res.status(200).json({
            status:"succesful",
            product
        })
    } catch (error) {
        res.status(401).json({
            staus:'failed',
            message:`${error}`,
           }) 
    }
}

exports.getIdProduct = async(req,res,next)=>
{
 const product = await Product.findById(req.params.id);
 if(!product)
    {
        res.status(404).json({
            staus:'failed',
            message:'no product found'
           }) 
    }
    res.status(200).json({
        status:"succesful",
        product
    })
}

exports.postProduct = async(req,res, next)=>
{
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        status: 'success',
        newProduct,
      });
}

exports.updateProduct = async(req, res, next)=>
{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators:true,
    });
    if(!product)
    {
        res.status(404).json({
            staus:'failed',
            message:'no product found'
           })  
    }
    res.status(201).json({
        status: 'success',
        product,
      });
}

exports.deleteProduct = async(req,res, next)=>
{
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product)
    {
        res.status(404).json({
            staus:'failed',
            message:'no product found'
           })    
    }
    res.status(200).json({
        status: 'success',
        data: null,
      });
}


exports.searchProducts = async (req, res, next) => {
    try {
        const query = req.query.query; 
        const product = await Product.find({
            productName: { $regex: query, $options: 'i' }
        });

        if (!product) {
            return res.status(404).json({
                status: 'failed',
                message: 'No product found matching the search query'
            });
        }

        res.status(200).json({
            status: 'success',
            product
        });
      
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        });
    }
};