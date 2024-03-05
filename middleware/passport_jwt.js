const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/user");
require('dotenv').config();
const cookieExtractor = function (req){
    let token = null;
    if(req){
        token = req.cookies['jwt'];
    }
    return token;
}
// const secretOrkey = 'arbuz';
const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'secret'
};
function passportFunction(passport){
    passport.use(
        new JwtStrategy(options, function (jwt_payload, done){
            User.findByEmail(jwt_payload.name, (err, user)=>{
                if(err) return done(err, false);
                if(user){
                    console.info("Токен успешно создан");
                    return done(null, user);
                }else{
                    console.info("Токен не создан");
                    return done(null, false);
                }
            })
        })
    )
};

module.exports = passportFunction;