import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setJWTToken from '../securityUtils/setJWTToken';
import jwt_decode from 'jwt-decode';
import { post } from './../core/axios';
import { config } from './../core/app.config';

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post('/api/users/register', newUser);
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
     const res = await post(config.baseURL, '/users/login');
    // // extract token from res.data
    // const { token } = res.data;
    // // store the token in the localStorage
    // localStorage.setItem('jwtToken', token);
    // // set our token in header ***
    // setJWTToken(token);
    // // decode token on React
    // const decoded = jwt_decode(token);
    // dispatch to our securityReducer
    // dispatch({
    //   type: SET_CURRENT_USER,
    //   payload: decoded
    // });
  } catch (err) {
    console.log(err);
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
