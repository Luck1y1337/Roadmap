const express = require('express');
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

const router = express.Router();

// Get all todos for a user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server xatosi');
  }
});

// Add a new todo
router.post('/', auth, async (req, res) => {
  try {
    const newTodo = new Todo({
      user: req.user.id,
      text: req.body.text,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server xatosi');
  }
});

// Update a todo (toggle complete or change text)
router.put('/:id', auth, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: 'Todo topilmadi' });

    // Make sure user owns todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Ruxsat etilmagan' });
    }

    if (req.body.text !== undefined) todo.text = req.body.text;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;

    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server xatosi');
  }
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: 'Todo topilmadi' });

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Ruxsat etilmagan' });
    }

    await todo.deleteOne();
    res.json({ msg: 'Todo ochirildi' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server xatosi');
  }
});

// Clear all completed todos for user
router.delete('/clear/completed', auth, async (req, res) => {
  try {
    await Todo.deleteMany({ user: req.user.id, completed: true });
    res.json({ msg: 'Bajarilgan vazifalar tozalandi' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server xatosi');
  }
});

module.exports = router;
