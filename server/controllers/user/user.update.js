const User = require('../../models/user.model');

module.exports = {
  toggleUser = (enabled) => {
    return (req, res, next) => {
      User.findOne({ uername: req.param.id })
        .then((user) => {
          user.update({
            $set: { enabled: enabled }
          });
        })
        .catch(next);
    };
  },
}