const router = require('express').Router();
const { Post, Comment, User } = require('../models/');


router.get('/', async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'postId', 'userId', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
   
    const posts = postData.map((post) => post.get({ plain: true }));
    const loggedIn = req.session.loggedIn;
    
    res.render('all-posts', { posts, loggedIn, layout: 'main' });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/post/:id', async (req, res) => {
  try {
    
    const postData = await Post.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'postId', 'userId', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    if (postData) {
      
      const post = postData.get({ plain: true });
      const loggedIn = req.session.loggedIn;
      res.render('single-post', { 
        post,
        loggedIn,
        layout: 'main' });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;