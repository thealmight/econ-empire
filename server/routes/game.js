const express = require('express');
const { authenticateToken, requireOperator } = require('./auth');
const { setGroupChatEnabled, getGroupChatEnabled } = require('../state/chatSettings');
const { ChatMessage, User } = require('../models');

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

// Get chat messages for a game (operator only)
router.get('/:gameId/chat/messages', authenticateToken, requireOperator, async (req, res) => {
  try {
    const { gameId } = req.params;
    const { type, from, to } = req.query; // optional filters

    const where = { gameId };
    if (type === 'group' || type === 'private') where.messageType = type;
    if (from) where.senderCountry = from;
    if (to) where.recipientCountry = to;

    const messages = await ChatMessage.findAll({
      where,
      order: [['sentAt', 'ASC']]
    });

    res.json(messages.map(m => ({
      id: m.id,
      gameId: m.gameId,
      messageType: m.messageType,
      senderCountry: m.senderCountry,
      recipientCountry: m.recipientCountry,
      content: m.content,
      sentAt: m.sentAt
    })));
  } catch (error) {
    console.error('Get chat messages error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
