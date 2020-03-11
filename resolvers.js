const user = {
  _id: "1",
  name: "dennis",
  email: "suarex",
  picture: "url"
};

module.exports = {
  Query: {
    me: () => user
  }
};
