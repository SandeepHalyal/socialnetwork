const jwt = require('jsonwebtoken');

class auth{
    constructor(){}
 tokenauth(token) {
    const decrypted= jwt.verify(token,"shaaa")
    return decrypted._id;
}
}

module.exports= new auth;