const router = require("express").Router();
const {
  me,
  fetchUserById,
  fetchRecommendedUsers,
  fetchSentFriendRequest,
  fetchIncommingFriendRequest,
  searchUsers,
} = require("../controllers/User/FetchUser");

const {
  sendMessageToFriend,
  getFriendMessages,
} = require("../controllers/User/Chat");
const {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  cancelSentFriendRequest,
  updateProfilePic,
  updateCoverPic,
  updateProfile,
  clearNotification,
} = require("../controllers/User/UserAction");
const authRequired = require("../middleware/AuthRequired");

router.get("/me", authRequired, me);
router.get("/recommended_users", authRequired, fetchRecommendedUsers);
router.get("/friend_request/sent", authRequired, fetchSentFriendRequest);
router.get(
  "/friend_request/received",
  authRequired,
  fetchIncommingFriendRequest
);

router.get("/search", searchUsers);
router.get("/friend_request/:userId/send", authRequired, sendFriendRequest);
router.get(
  "/friend_request/:requestId/accept",
  authRequired,
  acceptFriendRequest
);
router.get(
  "/friend_request/:requestId/decline",
  authRequired,
  declineFriendRequest
);
router.get(
  "/friend_request/:requestId/cancel",
  authRequired,
  cancelSentFriendRequest
);
router.get("/:user_id", authRequired, fetchUserById);

router.post("/chat/:friendId/send", authRequired, sendMessageToFriend);
router.get("/chat/:friendId/get_messages", authRequired, getFriendMessages);

router.put("/profile_pic/update", authRequired, updateProfilePic);
router.put("/cover_pic/update", authRequired, updateCoverPic);
router.put("/update_profile/:input", authRequired, updateProfile);
router.delete("/notifications/clear", authRequired, clearNotification);

module.exports = router;
