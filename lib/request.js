let API = '/log';

function errOnStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function config(config) {
  API = config.location || API;
};

export function log(msg) {
  fetch(API, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(msg),
  }).then(errOnStatus)
}
