
// TODO need this to be somewhere else.
var users = [];
var count = 0;

function addUser(user) {
  if (!user) return;
  if( users.indexOf(user) === -1 ) users.push(user);
};

function removeUser(user) {

};

function getUsers() {
  return users;
};

module.exports = {
  addUser: addUser,
  removeUser: removeUser,
  getUsers: getUsers
}
