// module.exports=(req,res,next)=>{
//     if(!req.session.isLoggedIn ){
//         return res.redirect('/auth-login-page')
//     }
//     next()
// }
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    console.log(req.get('Authorization'),"req.get('Authorization')")
const authHeader = req.get('Authorization');
if (!authHeader) {
  const error = new Error('Not authenticated.');
  error.statusCode = 401;
  throw error;
}
const token = authHeader.split(' ')[1];
let decodedToken;
try {
  decodedToken = jwt.verify(token, 'somesupersecretsecret');
} catch (err) {
    console.log(err,"erryyyyyy")
//   err.statusCode = 500;
//   throw err;
res.send({
    msg:"jwt expired"
})
}
if (!decodedToken) {
      console.log(err,"erryyyyyy")
  const error = new Error('Not authenticated.');
  error.statusCode = 401;
  throw error;
}
req.userId = decodedToken._id;

next();
}