const express = require('express');
const { authenticateToken, requireOperator } = require('./auth');
const { setGroupChatEnabled, getGroupChatEnabled } = require('../state/chatSettings');

const router = express.Router();

// Toggle group chat for a specific game (operator only)
router.post('/:gameId/chat/group', authenticateToken, requireOperator, async (req, res) => {
  try {
    const { gameId } = req.params;
    const { enabled } = req.body;
    const isEnabled = Boolean(enabled);
    setGroupChatEnabled(gameId, isEnabled);

    // Notify clients of chat setting change
    try {
      const { io } = require('../server');
      io.emit('chatSettingsUpdated', { gameId, groupChatEnabled: isEnabled });
    } catch (e) {
      // ignore broadcast errors
    }

    return res.json({ success: true, groupChatEnabled: getGroupChatEnabled(gameId) });
  } catch (error) {
    console.error('Toggle group chat error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
