const express = require('express');
const auth = require('../middleware/auth');
const Activity = require('../models/Activity');

const router = express.Router();

// Get all activity for user
router.get('/', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id });
    // Transform to an object { 'YYYY-MM-DD': count }
    const result = {};
    activities.forEach(a => {
      result[a.date] = a.count;
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server xatosi');
  }
});

// Increment activity for today
router.post('/track', auth, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    let activity = await Activity.findOne({ user: req.user.id, date: today });
    if (activity) {
      activity.count += 1;
      await activity.save();
    } else {
      activity = new Activity({ user: req.user.id, date: today, count: 1 });
      await activity.save();
    }
    
    res.json({ date: activity.date, count: activity.count });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server xatosi');
  }
});

module.exports = router;
