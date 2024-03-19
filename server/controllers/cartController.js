const Cart = require('../models/cartModel');

exports.addItemToCart = async(req,res,next)=>
{
    try {
      const {productId, quantity, price} = req.body;
      const userId = req.user.userId;
   
      const cart = await Cart.findOne(
        {userId: userId},

      );

      if(!cart){
        const newCart = await Cart.create({
            userId: userId,
            items: [{productId: productId, quantity:quantity,price: price }]
        });
        return res.status(201).json({ status: 'success', data: newCart });
      }
      const existingItem = cart.items.find(item=>item.productId.toString() === productId );
      if(existingItem)
      {
        existingItem.quantity += quantity;
      }else{
        cart.items.push({productId: productId, quantity: quantity, price:price});
      }
      await cart.save();

      return res.status(200).json({ status: 'success', data: cart });
  } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
  }
}

exports.removeItemFromCart = async(req,res,next)=>
{
    try {
        const userId = req.user.userId;
        const productId = req.params.itemId;

        const updatedCart = await Cart.findOneAndUpdate(
            { userId: userId },
            { $pull: { items: { productId: productId } } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }

        res.status(200).json({ status: "success", message: "Product removed from cart" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

exports.getCart = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      
      const cart = await Cart.findOne({ userId }).populate('items.productId');
    
      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Cart not found' });
      }
  
      res.status(200).json({ status: 'success', cart, userId});
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };