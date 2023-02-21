module.exports = function buildLogin() {
  return function makeLogin({ username, password } = {}) {


    if (!username) {
      throw new Error("User name must a value");
    }

    if (!password) {
      throw new Error("Password must have a value");
    }

    return Object.freeze({
      getUsername: () => username,
      getPassword: () => password
    });
  };
};
