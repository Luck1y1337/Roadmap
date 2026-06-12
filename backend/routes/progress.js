const express = require('express');
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');

const router = express.Router();

// Get progress for current user
router.get('/', auth, async (req, res) => {
  try {
    let progress = await Progress.findOne({ user: req.user.id });
    if (!progress) {
      // Create default progress if not exists
      progress = new Progress({ user: req.user.id, checks: {} });
      await progress.save();
    }
    res.json(progress.checks || {});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server xatosi');
  }
});

// Update progress
router.post('/', auth, async (req, res) => {
  try {
    const { checks } = req.body;
    let progress = await Progress.findOne({ user: req.user.id });
    
    if (!progress) {
      progress = new Progress({ user: req.user.id, checks });
    } else {
      progress.checks = checks;
      progress.updatedAt = Date.now();
    }

    await progress.save();
    res.json(progress.checks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server xatosi');
  }
});

module.exports = router;
