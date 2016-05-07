// export function checkAuthentication (next, previous, callback) {
//   console.log(SERVER_URL);
//   return axios.get(SERVER_URL)
//   .then((response) => {
//     if (response.status === 200) { callback(); console.log('authorized'); return Promise.resolve('authorized'); }
//     else Promise.reject('not authorized');
    
//   })
//   .catch((error) => { console.log('not authorized'); previous('/login'); callback(); });
// }


function postCredentials (username, password, url) {
  console.log('username: ' + username, 'password: ' + password, 'url: ' + url);
  return new Promise(function (resolve, reject) {
    axios.post(url, {username: username, password: password})
    .then((response) => resolve(response.data))
    .catch(reject);
  });
}

function navigateToProtected () {
  return Promise.resolve(location.href = '/#/video');
  // return Promise.resolve(store.dispatch(push('#/quiz')))
}

function setStorage (object) {
  var temp = localStorage.inClass ? JSON.parse(localStorage.inClass) : {} ;
  for (var key in object) {
    temp[key] = object[key];
  }
  localStorage.inClass = JSON.stringify(temp);
  return Promise.resolve(object);
}

function setState (object) {
  // in progress
  // set the state here
  this.props.actions.login(object.username, '');

  return Promise.resolve();
}

