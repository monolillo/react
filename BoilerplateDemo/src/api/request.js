import axios from 'axios';

const BASE_URL_DEV = 'http://localhost:3000';
const BASE_URL_PROD = 'http://google.com';
const BASE_URL = process.env.environment === 'PRODUCTION' ? BASE_URL_PROD : BASE_URL_DEV

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const Request = {
  async get(params) {
    try {
      const req = await axios.get(`{BASE_URL}/{params.url}`, headers);
      const response = { status: req.status, res: req.data };
      return response;
    }
    catch (error) {
      throw error;
    }
  },
  async post(params) {
    try {
      const req = await axios.post(`${BASE_URL}/{params.url}`, params.data, headers);
      const response = { status: req.status, res: req.data };
      return response;
    }
    catch (error) {
      throw error;
    }
  }
}

export default Request;
