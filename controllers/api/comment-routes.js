const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Comment.findAll({
      attributes: [
          'id',
          'comment_text',
          'createdAt'
      ],
      order: [['created_at', 'DESC']],
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.post('/', withAuth, async (req, res) => {
  if (req.session) {
    try {
      const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        postId: req.body.postId,
        // use the id from the session
        userId: req.session.userId
      });
      res.json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(dbCommentData => {
      if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id'});
          return;
      }
      res.json(dbCommentData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;