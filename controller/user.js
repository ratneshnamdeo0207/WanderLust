const User = require("../models/user");
const { passwordStrength } = require('check-password-strength')
const zxcvbn = require("zxcvbn");
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs")
};

module.exports.signup = async (req, res) => {
    try {

        let { email, username, password } = req.body;
        let newUser = new User({ email, username });
        let result = zxcvbn(password);

        if (result.score >= 2) { // 0=weak, 4=strong
            let registeredUser = await User.register(newUser, password);
            console.log(registeredUser);
            
            req.login(registeredUser, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash("success", "Welcome to Wanderlust");
                res.redirect("/listings");
            }
            )

        } else {
            console.log("❌ Weak password");
            req.flash("error", "Weak Password")
            res.redirect("/signup")
        }



    } catch (err) {
        console.log(err)
        req.flash("error", err.message);
        res.redirect("/signup")
    }

};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs")
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!")
    let url = res.locals.redirectUrl || "/listings";
    res.redirect(url)
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!!")
        res.redirect("/listings")
    })
};

