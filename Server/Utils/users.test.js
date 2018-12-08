const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  var users;

  // Adding data before the test
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mirza',
      room: 'Open Hack Day'
    }, {
      id: '2',
      name: 'Abe',
      room: 'Army Ops'
    }, {
      id: '3',
      name: 'Cama',
      room: 'Open Hack Day'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Mike',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '99';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  it('should return names for Open Hack Day', () => {
    var userList = users.getUserList('Open Hack Day');

    expect(userList).toEqual(['Mirza', 'Cama']);
  });

  it('should return names for Army Ops', () => {
    var userList = users.getUserList('Army Ops');

    expect(userList).toEqual(['Abe']);
  });
});
