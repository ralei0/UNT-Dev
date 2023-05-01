const Product = require('../../models/Product');
const User = require('../../models/User');
const Order = require('../../models/Order');

exports.getHome = (req, res, next) => {
    Product.find()
        .then(products => {
            //console.log("hjghghjgjg", req);
            res.render('user/home', {
                product: products,
                pageTitle: 'Home',
                name: req.session.user.name

            });
        })
        .catch((err) => { //console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/home');
        });

};
exports.getSearch = (req, res, next) => {
    const search = req.body.search;
    console.log(req.body);
    Product.find({title:search})
        .then(products => {
            //console.log("hjghghjgjg", req);
            res.render('user/home', {
                product: products,
                pageTitle: 'Home',
                name: req.session.user.name

            });
        })
        .catch((err) => { //console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/home');
        });

};
exports.getProduct = (req, res, next) => {
    const id1 = req.params.productId;
    Product.findById(id1)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: 'Product details',
            });
        })
        .catch((err) => { //console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/home');
        });
}

exports.getCart = (req, res, next) => {

    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            return res.render('shop/cart', {
                products: products,
                pageTitle: 'Your Cart',
            });
        })
        .catch((err) => { //console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/home');
        });
}

exports.postCart = (req, res, next) => {

    const id = req.body.productId;
    Product.findById(id)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch((err) => { //console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/home');
        });
};

exports.postCartDeleteItem = (req, res, next) => {
    const id = req.body.productId;
    // console.log(id);
    req.user
        .removeFromCart(id)
        .then(result => {
            // console.log("deleted");
            res.redirect('/cart');
        })
        .catch((err) => { //console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/home');
        });

};


exports.getOrders = (req, res, next) => {
    Order.find({ "user.userId": req.user._id })
        .then(orders => {

            res.render('shop/orders', {
                pageTitle: 'Your Orders',
                orders: orders,

            });
        })
        .catch((err) => { //console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/home');
        });


}

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: {...i.productId._doc } };
            });

            Order.countDocuments({}, (err, count) => {
                const order = new Order({
                    user: {
                        email: req.user.email,
                        userId: req.user,
                    },
                    products: products,
                    total: count + 1
                });
                return order.save();
            });


        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch((err) => { //console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/home');
        });


};



// exports.getCheckout = (req,res,next) => {
// res.render('shop/checkout',{
// pageTitle:'Checkout'
// });
// }