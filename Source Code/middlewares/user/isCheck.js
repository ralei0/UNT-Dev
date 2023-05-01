module.exports = (req,res,next) => {

    if(req.session.isAdminLoggedIn)
    {
        return res.redirect('/admin/home');
    }
    if(req.session.isUserLoggedIn)
    {
            return res.redirect('/home');
    }
   
    next();
};