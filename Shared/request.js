import {Base_URL} from '../src/Providers';
import {store} from '../src/Store';

const postRequest = async (URL, payload) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', store.getState().user?.token ?? '');
  var raw = JSON.stringify(payload);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const response = await fetch(Base_URL + '' + URL, requestOptions);

  return response.json();
};

const getRequest = async URL => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', store.getState().user?.token ?? '');
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const response = await fetch(Base_URL + '' + URL, requestOptions);

  return response.json();
};

const API = {
  get: getRequest,
  post: postRequest,
};

export {API};
