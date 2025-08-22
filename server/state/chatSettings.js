const groupChatEnabledByGame = new Map();

function getGroupChatEnabled(gameId) {
  if (!gameId) return true;
  if (!groupChatEnabledByGame.has(gameId)) return true;
  return Boolean(groupChatEnabledByGame.get(gameId));
}

function setGroupChatEnabled(gameId, enabled) {
  if (!gameId) return;
  groupChatEnabledByGame.set(gameId, Boolean(enabled));
}

function clearGroupChatSetting(gameId) {
  if (!gameId) return;
  groupChatEnabledByGame.delete(gameId);
}

module.exports = {
  getGroupChatEnabled,
  setGroupChatEnabled,
  clearGroupChatSetting
};