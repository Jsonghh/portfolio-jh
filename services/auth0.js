import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { getCookieFromReq } from '../helpers/utils';

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'jsong.auth0.com',
      clientID: 'x46FKWdKpgsveYO2Qs41p6605oI5wOIi',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid'


    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
          history.replace('/home');
          console.log(err);
          alert(`Error: ${err.error}. Check the console for further details.`);
        }
      });
    })
    
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    // localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    // this.accessToken = authResult.accessToken;
    // this.idToken = authResult.idToken;
    // this.expiresAt = expiresAt;

    Cookies.set('user', authResult.idTokenPayload);
    Cookies.set('jwt', authResult.idToken);
    Cookies.set('expiresAt', expiresAt);

    // navigate to the home route
    // history.replace('/home');
  }

  logout() {
    Cookies.remove('user');
    Cookies.remove('jwt');
    Cookies.remove('expiresAt');

    this.auth0.logout({
      returnTo: '',
      clientID: 'x46FKWdKpgsveYO2Qs41p6605oI5wOIi'
    })
  }

  login() {
    this.auth0.authorize();
  }

  async getJWKS() {
    const res = await axios.get('https://jsong.auth0.com/.well-known/jwks.json');
    const jwks = res.data;
    return jwks;
  }

  async verifyToken(token) {
    if (token) {
      const decodedToken = jwt.decode(token, {complete: true});
      if (!decodedToken) {return undefined;}
      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];
      // build certificate
      let cert = jwk.x5c[0]; 
      cert = cert.match(/.{1,64}/g).join('\n');
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;
          return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
        } catch(err) {
          return undefined;
        }
      }
    }
    return undefined;
  }

  async clientAuth() {
    const token = Cookies.getJSON('jwt');
    const verifiedToken = await this.verifyToken(token);
    return verifiedToken;
  }

  async serverAuth(req) {
    if (req.headers.cookie) {

      const token = getCookieFromReq(req, 'jwt');
      const verifiedToken = await this.verifyToken(token);
      return verifiedToken;
    }
    return undefined;
  }
}

const auth0Client = new Auth0();

export default auth0Client;

