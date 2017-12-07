import axios from 'axios';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

export function getUsers () {
  return get('users');
}

export function deleteUser(id) {
  return del(`users/${id}`);
}

function get(url) {
  return axios.get(baseUrl + url)
    .then(response => onSuccess(response))
    .catch(error => onError(error));
}

function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE'
  });

  return axios.delete(request.url)
    .then(request => onSuccess(request))
    .catch(error => onError(error));
}

function onSuccess(response) {
  return response;
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
