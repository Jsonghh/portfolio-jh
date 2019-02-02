
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');



// MIDDLEWARE
exports.checkJWT = jwt({ 
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: 'https://jsong.auth0.com/.well-known/jwks.json'
  }),
  audience: 'x46FKWdKpgsveYO2Qs41p6605oI5wOIi',
  issuer: 'https://jsong.auth0.com/',
  algorithms: ['RS256'] 
})