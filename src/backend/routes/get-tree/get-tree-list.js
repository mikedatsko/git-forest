const axios = require('axios');
const userGit = require('../../db').dbModels.userGit;

async function getUserRepoList(userId, page, repoList) {
  try {
    const url = `${process.env.GITHUB_API}/users/${userId}/repos?type=owner&per_page=100&page=${page}`;
    const userRepoList = await axios.get(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_AUTH_TOKEN}`
      }
    });

    console.log('userRepoList', userRepoList.data.length);

    const userRepoCount = userRepoList.data.length;
    repoList = [...repoList, ...userRepoList.data.map(repo => repo.name)];

    return userRepoCount === 100 ? getUserRepoList(userId, page + 1, repoList) : repoList;
  } catch(err) {
    return {error: JSON.stringify(err.stack)};
  }
}

module.exports = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log('userId', userId);

    if (!userId) {
      throw ({name: 'No user ID'});
    }

    const userRepoList = await getUserRepoList(userId, 0, []);

    if (userRepoList.error) {
      throw ({name: userRepoList.error});
    }

    const userRepoCount = userRepoList.length;
    const user = await userGit.findOne({user_id: userId});

    console.log('userRepoCount', userRepoCount);

    if (!user) {
      const newUser = new userGit({
        user_id: userId,
        repo_count: userRepoCount
      });
      await newUser.save();
    } else {
      user.repo_count = userRepoCount;
      await user.save();
    }

    const userPlace = await userGit.find({repo_count: { $gt: userRepoCount}}).count();

    console.log('userPlace', userPlace);

    return res.send({
      repo_list: userRepoList,
      user_top_list: userTop.map(user => ({user_id: user.user_id, repo_count: user.repo_count})),
      user_place: userPlace + 1,
      user_repo_count: userRepoCount
    });
  } catch(err) {
    return res.status(400).send({error: err});
  }
};
