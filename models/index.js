const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'userId'
});

User.hasMany(Post, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  Comment,
  Post
};