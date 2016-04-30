/* globals $, location*/
function onSubmit () {
	var username = $('.login > .username').val();
  var password = $('.login > .password').val();
  var url = '/' + $('.login > .actions').val();

  postCredentials(username, password, url)
  .then(navigateToProtected)
  .catch(function (error) {
  	console.error(error);
  });

	return false;
}




function postCredentials (username, password, url) {
	return new Promise(function (resolve, reject) {
    $.ajax({
    	url: url,
    	method: 'POST',
    	data: {username: username, password: password},
    	complete: resolve,
    	error: reject
    });
	});
}

function navigateToProtected () {
  return Promise.resolve(location.href = '/protected');
}






