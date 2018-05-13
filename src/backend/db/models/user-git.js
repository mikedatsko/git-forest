const mongoose = require('mongoose');

const UserGit = mongoose.model('UserGit',
  {
    user_id: String,
    repo_count: Number
  }
);

module.exports = UserGit;
