import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setJWTToken from '../securityUtils/setJWTToken';
import jwt_decode from 'jwt-decode';
// import { post } from './../core/axios';
// import { config } from './../core/app.config';

//TODO info to test the backend, change IP address to "localhost" oder enter new IPAddess for Backend, which will be running on a RaspberryPis

export const createNewUser = (user, history) => async dispatch => {
  try {
    await axios.post('http://10.14.0.13:8080/user/register', user);
    history.push('/login');
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    // post => Login Request

    const res = await axios.post('http://10.14.0.13:8080/login', LoginRequest);
    // extract token from res.data
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem('jwtToken', token);
    // set  token in header ***
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispatch to securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
