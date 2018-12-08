
class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(newUser => newUser.id !== id);
    }
  
    return user;
  }
  
  getUser(id) {
    return this.users.filter(newUser => newUser.id === id)[0];
  }
  
  getUserList(room) {
    const users = this.users.filter(newUser => newUser.room === room);
    const namesArray = users.map(newUser => newUser.name);
  
    return namesArray;
  }
}
  
module.exports = { Users };
