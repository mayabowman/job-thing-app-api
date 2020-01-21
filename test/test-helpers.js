const bcrypt = require('bcryptjs')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'cwelch',
      full_name: 'Carl Welch',
      password: 'Thinkful1!',
      date_created: '11/01/2019'
    },
    {
      id: 2,
      user_name: 'zhenderson',
      full_name: 'Zoe Henderson',
      password: 'Thinkful1!',
      date_created: '12/24/2019'
    },
    {
      id: 3,
      user_name: 'lknox',
      full_name: 'Lucas Knox',
      password: 'Thinkful1!',
      date_created: '12/02/2019'
    }
  ];
}

function seedUsers(users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 12),
  }));
  return preppedUsers
}

module.exports = {
  makeUsersArray,
  seedUsers
};