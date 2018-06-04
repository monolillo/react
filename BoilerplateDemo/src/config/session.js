import Request from '../api/request';
import { URL_LOGIN } from '../api/URL';

const Auth = {
  login: (user, password) => {
    Request.post({
      url: URL_LOGIN,
      data: {
        user,
        password
      }
    })
    .then(response => {
      createAccess();
    })
    .catch()
  },
  isLogged: () => {
    const validate = validateJWT();
    return validate;
  },
  logout: () => {
    // destroy login
  }
}

const createAccess = () => {
  // jwt
};


const validateJWT = () => {
  return false
}


export default Auth;
