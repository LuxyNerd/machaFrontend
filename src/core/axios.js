import axios from 'axios';
import jwt_decode from 'jwt-decode';

let authorizationToken = null;

export const setAuthorizationToken = token => {
  authorizationToken = token;
};

export const getAuthorizationToken = () => {
  return authorizationToken;
};

export const getUserId = () => {
  if (authorizationToken) {
    return jwt_decode(authorizationToken).userId;
  }
};

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    //Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    //Do something with error
    return Promise.reject(error);
  }
);

async function getHeaderConfig(service) {
  let config;

  try {
    config = {
      headers: {
        authorization: authorizationToken ? authorizationToken : null,
        'Content-Type': 'application/json'
      },
      baseURL: service
    };
  } catch (error) {
    throw error;
  }
  return config;
}

/**
 * Axios HTTP GET method.
 *
 * @param {string} url
 * @returns {Promise<AxiosPromise<any>>}
 */
export async function get(service, url) {
  const config = await getHeaderConfig(service);
  return axios.get(url, config);
}

// TODO: aync/await and Promise funcitons
/**
 * Axios HTTP POST method.
 *
 * @param {string} url
 * @param value
 * @returns {Promise<AxiosPromise<any>>}
 */
export async function post(service, url, value) {
  const config = await getHeaderConfig(service);
  return axios.post(url, value, config);
}

/**
 * Axios HTTP PUT method.
 *
 * @param {string} url
 * @param value
 * @returns {Promise<AxiosPromise<any>>}
 */
export async function put(service, url, value) {
  const config = await getHeaderConfig(service);
  return axios.put(url, value, config);
}

/**
 * Axios HTTP DELETE method.
 *
 * @param {string} url
 * @returns {Promise<AxiosPromise>}
 */
export async function remove(service, url) {
  const config = await getHeaderConfig(service);
  return axios.delete(url, config);
}
