module.exports = {
  register: (req, res) => {

    if(!req.session) {
      req.session.user = {username: "", password: ""}
    } else {
      const db = req.app.get('db');
      db.users.save(req.body).then(response => {
        console.log(response);
        req.session.user = response;
        res.status(200).json(req.session.user);
      })
    }
  },
  login: (req, res) => {
    const db = req.app.get('db');
    db.users.find().then(response => {
      console.log(response);
      const user = response.find(user => user.username === req.body.username && user.password === req.body.password);
      if(user) {
        let newUser = {
          username: user.username,
          password: user.password,
          timeLoggedIn: new Date()
        }
        req.session.user = newUser
        res.status(200).json(req.session.user);
      } else {
        res.status(500).json("You need to register")
      }
    })
  },
  getUser: (req, res) => {
    res.status(200).json(req.session.user);
  },
  signout: (req, res) => {
    req.session.destroy();
    res.status(200).json(req.session);
  }
}