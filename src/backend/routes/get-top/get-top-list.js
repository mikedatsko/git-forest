const axios = require('axios');
const userGit = require('../../db').dbModels.userGit;

module.exports = async (req, res, next) => {
  try {
    const userTop = await userGit.find().sort({repo_count: -1}).limit(10);

    return res.send({
      user_top_list: userTop.map(user => ({user_id: user.user_id, repo_count: user.repo_count})),
    });
  } catch(err) {
    return res.status(400).send({error: err});
  }
};
