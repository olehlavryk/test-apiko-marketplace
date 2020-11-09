import axios from 'axios';

export const Auth = {
  _token: null,

  setToken(token) {
    this._token = token;
    localStorage.setItem('__token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  async logout() {
    this._token = null;
    await localStorage.removeItem('__token');
    axios.defaults.headers.common.Authorization = `undefined`;
  },

  isLoggedIn() {
    return !!this._token;
  },

  login({ email, password }) {
    return axios.post('/api/auth/login', {
      email,
      password,
    });
  },

  register({ email, password, fullName }) {
    return axios.post('/api/auth/register', {
      email,
      password,
      fullName,
    });
  },
};

export const Account = {
  getUser() {
    return axios.get('/api/account');
  },

  updateViewer({ fullName, avatar, phone, location }) {
    return axios.put('/api/account', {
      fullName,
      avatar,
      phone,
      location,
    });
  },
};

export const Products = {
  fetchLatest() {
    return axios.get('/api/products/latest');
  },

  fetchSaved() {
    return axios.get('/api/products/saved');
  },

  getById(id) {
    return axios.get(`/api/products/${id}`);
  },

  byUserId(id) {
    return axios.get(`/api/users/${id}/products`);
  },

  addProduct({ title, location, description, price, photos }) {
    return axios.post('/api/products', {
      title,
      location,
      description,
      price,
      photos,
    });
  },

  saveById(id) {
    return axios.post(`/api/products/${id}/saved`);
  },

  removeSaveById(id) {
    return axios.delete(`/api/products/${id}/saved`);
  },
};

export const Users = {
  getById(id) {
    return axios.get(`/api/users/${id}`);
  },
};

export const Chats = {
  createChat(id, message) {
    return axios.post(`/api/products/${id}/createChat`, {
      message,
    });
  },
};
