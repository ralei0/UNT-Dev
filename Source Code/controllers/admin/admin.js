const Product = require('../../models/Product');
//const path = require('path')

exports.getHome = (req, res, next) => {

    res.render('./admin/home', {
        pageTitle: "Admin Panel",
    });
};


exports.getAddProducts = (req, res, next) => {

    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        isAuthenticated: req.session.isLoggedIn,
        editing: false
    });
};

exports.postAddProducts = (req, res, next) => {

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const isAuthenticated = req.session.isLoggedIn
    const image = req.file;
    if (!image) {
        req.flash('error_msg', 'Image not uploaded successfully or format is not correct.');
        res.redirect('/admin/add-product');
    }
    const imageUrl = image.path
    console.log('=========nnnn', imageUrl);;
    if (isNaN(price)) {
        req.flash('error_msg', 'Price must be numeric.');
        res.redirect('/admin/add-product');
    }

    const product = new Product({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,

    });

    product.save()
        .then(result => {
            //res.send('product submitted successfully')
            req.flash('error_msg', 'product submitted successfully');

            res.redirect('/admin/add-product');
        })
        .catch((err) => {
            // console.log(err)
            req.flash('error_msg', 'Something wrong happende.');
            res.redirect('/admin/home');
        });

};

exports.getEditProduct = (req, res, next) => {

    const editMode = req.query.edit;
    if (editMode == false) {
        return res.redirect('/');
    }
    req.flash('error_msg', 'yes');
    const id = req.params.productId;
    Product.findById(id)
        .then(product => {
            const product1 = product;
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                editing: editMode,
                isAuthenticated: req.session.isLoggedIn,
                product: product1

            });
        })
        .catch((err) => {
            // console.log(err)
            req.flash('error_msg', 'Something wrong happende.');
            res.redirect('/admin/home');
        });


}

exports.postEditProduct = (req, res, next) => {

    const id = req.body.productId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.file;
    const imageUrl = image.path;

    Product.findById(id)
        .then(product => {
            product.title = title;
            product.price = price;
            product.description = description;
            product.imageUrl = imageUrl;
            return product.save();
        })
        .then(result => {
            res.redirect('/');
        })
        .catch((err) => {
            // console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/admin/home');
        });

}


exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('admin/products', {
                product: products,
                pageTitle: 'Admin Products',


            });
        })
        .catch((err) => {
            // console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/admin/home');
        });

}

exports.postDeleteProduct = (req, res, next) => {

    const id = req.body.productId;
    Product.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch((err) => {
            // console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/admin/home');
        });

}