
// TODO need this to be somewhere else.
var users = [];
var count = 0;

function addUser(user) {
  if (!user) return;
  if( users.indexOf(user) === -1 ) users.push(user);
};

function removeUser(user) {
  if (!user) return;

  console.log('removeUser', user);
  var index = users.indexOf(user);
  console.log('index', index);

  if (index !== -1) {
    users.splice(index, 1);
  }
  console.log('ending', users);
};

function getUsers() {
  return users;
};

module.exports = {
  addUser: addUser,
  removeUser: removeUser,
  getUsers: getUsers
}
