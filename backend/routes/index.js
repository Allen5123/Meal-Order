import express from 'express';

const router = express.Router();
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default router;