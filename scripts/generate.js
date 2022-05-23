const auth = require("../src/json/Auth.json");
const following = require("../src/json/Following.json");
const post = require("../src/json/Post.json");

const user = require("../src/json/User.json");
// Inside commonjs
module.exports = function () {
  // Do not validate auth, pass anyways
  return {
    auth,
  };
};
