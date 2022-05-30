const auth = require("../src/json/Auth.json");
const following = require("../src/json/Following.json");
const post = require("../src/json/Post.json");
const crypto = require("crypto");
const user = require("../src/json/User.json");
// Inside commonjs
module.exports = function () {
  const fLen = crypto.randomInt(40, 100);
  const feed = post.slice(fLen);
  const users = user.slice(fLen);
  return {
    auth,
    following,
    post,
    feed,
    topfeed: feed[fLen],
    users,
  };
};
