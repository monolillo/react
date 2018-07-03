import axios from 'axios';
import { BASE_URL_DEV, BASE_URL_PROD, LOGIN_AZURE } from './URLs';
import { withRouter } from "react-router-dom";
import Auth from '../config/session';

const BASE_URL = process.env.environment === 'PRODUCTION' ? BASE_URL_PROD : BASE_URL_DEV
const headers = { 'Content-Type': 'text/plain' }
const headersLoginAzure = {
  headers: {
    'Authorization': 'Basic ' + btoa('testjwtclientid:XY7kmzoNzl100'),
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
};

const messageError401 = 'You are not authorized to this action or your session has expired';
const messageErrorDefault = 'There was an unexpected situation , try again later';

const Request = {
  async get(params) {
    try {
      const req = await axios.get(`${BASE_URL}/${params.url}`, headers);
      const response = { status: req.status, res: req.data };
      return response;
    }
    catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert(messageError401);
          Auth.logout();
          window.location.href = '/';
        }
      } else {
        throw error;
      }
    }
  },
  async post(params) {
    try {
      const req = await axios.post(`${BASE_URL}/${params.url}`, params.data, headers);
      const response = { status: req.status, res: req.data };
      return response;
    }
    catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert(messageError401);
          Auth.logout();
          window.location.href = '/';
        }
      } else {
        throw error;
      }
    }
  },
  async put(params) {
    try {
      const req = await axios.put(`${BASE_URL}/${params.url}`, params.data, headers);
      const response = { status: req.status, res: req.data };
      return response;
    }
    catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert(messageError401);
          Auth.logout();
          window.location.href = '/';
        }
      } else {
        throw error;
      }
    }
  },
  async delete(params) {
    try {
      const req = await axios.delete(`${BASE_URL}/${params.url}`, params.data, headers);
      const response = { status: req.status, res: req.data };
      return response;
    }
    catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert(messageError401);
          Auth.logout();
          window.location.href = '/';
        }
      } else {
        throw error;
      }
    }
  },
  async postLogin(params) {
    try {
      const req = await axios.post(`${LOGIN_AZURE}/oauth/token`, params.data, headersLoginAzure);
      const response = { status: 200, res: req };
      return response;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  },
  handleErrors(error) {
  }

}

export default withRouter(Request);
