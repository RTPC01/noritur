const Board = require('../models_neighbor/board');
const Comment = require('../models_neighbor/comment');

module.exports.createComment = async (req, res) => {
    const board = await Board.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    board.comments.push(comment);
    await comment.save();
    await board.save();
    req.flash('success', 'Comment has been registered.')
    res.redirect(`/noritur_neighbor/${board._id}`);
}

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    await Board.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'The comment has been deleted.')
    res.redirect(`/noritur_neighbor/${id}`)
}