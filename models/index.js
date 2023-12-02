const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// A user can have many posts and comments.
User.hasMany(Post, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Comment, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// A post and comment belong to a user.
Post.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// A post can have many comments.
Post.hasMany(Comment, { foreignKey: 'post_id', onDelete: 'CASCADE' });

// A comment belongs to a post.
Comment.belongsTo(Post, { foreignKey: 'post_id', onDelete: 'CASCADE' });

// Relationships are cascading, so:
// If a user is deleted, all of their posts and comments will be deleted.
// If a post is deleted, all of its comments will be deleted as well.
// TODO - reconsider this approach:
// maybe it makes more sense to User's posts and comments to remain, but be "uncredited"?

module.exports = { User, Post, Comment };
