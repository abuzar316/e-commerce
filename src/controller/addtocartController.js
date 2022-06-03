const addtocartSchema = require('../models/addToCart');


module.exports.getAddtoCart = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const CartUser = await addtocartSchema.findOne({ user_id: userId }).populate('products.product').populate('user_id')
        const fullname = `${CartUser.user_id.first_name} ${CartUser.user_id.last_name}`
        const cartItem = CartUser.products.length
        let totalprice = 0
        CartUser.products.forEach(item => {
            let oneItem = item.quantity * item.product.price;
            totalprice += oneItem;
            return totalprice
        });
        res.status(200).render('add-to-cart', { user_info: req.logeddin , products:CartUser.products,totalprice })
    } catch (error) {
        console.log(error);
    }
}

module.exports.Addaddtocart = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user.user_id;
        const CartUser = await addtocartSchema.findOne({ user_id: userId });
        CartUser.products = [...CartUser.products, { product: productId }];
        CartUser.updatedat = Date.now()
        await CartUser.save();
        res.status(200).redirect('/')
    } catch (error) {
        console.log(error);
    }
}

module.exports.removeCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user.user_id;
        const CartUser = await addtocartSchema.findOne({ user_id: userId })
        const data = CartUser.products
        CartUser.products = CartUser.products.filter((item) => {
            return item.product != productId
        })
        await CartUser.save();
        res.status(200).redirect('/add-to-cart')
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user.user_id;
        const CartUser = await addtocartSchema.findOne({ user_id: userId });
        let data = CartUser.products;
        data = data.filter((item)=>{
            if(item.product == productId){
                item.quantity = req.body.quantity;
            }
        })
        await CartUser.save()  
        res.status(200).redirect('/add-to-cart')
    } catch (error) {
        console.log(error);
    }
}