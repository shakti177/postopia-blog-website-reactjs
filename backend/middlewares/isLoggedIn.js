const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.isLoggedIn = async (req, res, next) => {
    
    if(!req.cookies.token) {
        req.flash('error', 'You Need To Login First!');
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await userModel
            .findOne({email: decoded.email})
            .select('-password');
        req.user = user;
        next();
        } catch (error) {
            req.flash('error', 'You Need To Login First!');
            return res.redirect('/');
        }
        
}