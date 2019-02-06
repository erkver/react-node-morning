const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username } = req.body;
    try {
      const result = await db.login_user(username);
      // console.log(result);
      const existingUser = result[0];
      if(existingUser) {
        res.status(409).json("Username Taken");
      }
      const password = await bcrypt.hash(req.body.password, 12);
      // console.log(password)
      const newUser = await db.register_user([true, username, password]);
      const user = newUser[0];
      req.session.user = {
        isAdmin: user.is_admin,
        id: user.id,
        username: user.username
      };
      res.status(200).json(req.session.user);
    } catch(err) {
      console.log(err);
      res.status(500).json("Failed to register")
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await req.app.get('db').login_user(username);
      // console.log(result);
      const user = result[0];
      if (!user) {
        res.status(500).json("You need to register");
      }
      const isAuthed = await bcrypt.compare(password, user.hash);
      if(!isAuthed) {
        res.status(500).json("Incorrect Password");
      }
      req.session.user = {
        isAdmin: user.is_admin,
        id: user.id,
        username: user.username,
      }
      res.status(200).json(req.session.user);

    } catch(err) {
      console.log(err);
      res.status(500).json("Login failed");
    }

  },
  getUser: (req, res) => {
    res.status(200).json(req.session.user);
  },
  signout: (req, res) => {
    req.session.destroy();
    res.status(200).json(req.session);
  }
}