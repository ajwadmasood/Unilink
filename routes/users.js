const User = require("../models/User");
const router = require("express").Router();

const {
  updateUser,
  deleteUser,
  getUser,
  getFriends,
  followUser,
  unfollowUser
} = require('../controllers/users')


router.route("/:id").put(updateUser).delete(deleteUser)
router.get('/', getUser)
router.get("/friends/:userId", getFriends)
router.put("/:id/follow", followUser)
router.put("/:id/unfollow", unfollowUser)

module.exports = router