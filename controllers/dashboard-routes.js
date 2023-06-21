const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    
    postData = await Post.findAll({
      where: {
        userId: req.session.userId
      },
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

    res.render('all-posts-admin', {
   
      layout: 'dashboard',
      
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
 
  res.render('new-post', {
    
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
  
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['title', 'content', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'postId', 'userId', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    });

    if (postData) {
      
      const post = postData.get({ plain: true });
      
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;