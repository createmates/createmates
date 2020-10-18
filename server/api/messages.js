const router = require('express').Router();
const { Message, User } = require('../db/models');

module.exports = router;

// GET /api/messages
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// POST /api/messages
router.post('/', async (req, res, next) => {
  try {
    const message = Message.build(req.body);
    message.setUser(req.body.user.id, { save: false });
    await message.save()
    const returnMessage = message.toJSON();
    returnMessage.user = req.body.user;
    res.json(returnMessage);
  } catch (err) {
    next(err);
  }
});

// PUT /api/messages
router.put('/:messageId', async (req, res, next) => {
  try {
    const messageId = req.params.messageId;
    const message = await Message.findByPk(messageId)
    await message.update(req.body);
    res.json(message);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/messages
router.delete('/:messageId', async (req, res, next) => {
  try {
    const id = req.params.messageId;
    await Message.destroy({ where: { id } })
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
