import axios from 'axios';

export function getUsers () {
  return get('users');
}

export function deleteUser(id) {
  return del(`users/${id}`);
}

function get(url) {
  return axios.get(url)
    .then(response => onSuccess(response))
    .catch(error => onError(error));
}

function del(url) {
  const request = new Request(url, {
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
