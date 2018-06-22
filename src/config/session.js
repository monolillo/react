const Auth = {
  setLogin: (token) => {
    localStorage.setItem('token', token);
  },
  isLogged: () => {
    if (localStorage.token) {
      return true;
    }

    return false;
  },
  logout: () => {
    delete localStorage.token;
  }
}

const validateJWT = () => {
  return false
}

export default Auth;
