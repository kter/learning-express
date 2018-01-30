const express = require('express');
const moment = require('moment');
const connection = require('../mysqlConnection');

const router = express.Router();

router.get('/:board_id', (req, res) => {
  const boardId = req.params.board_id;
  const getBoardQuery = `SELECT * FROM boards WHERE board_id = ${boardId}`;
  const getMessagesQuery = `SELECT M.message, ifnull(U.user_name, '名無し') AS user_name, DATE_FORMAT(M.created_at, '%Y年%m月%d日 %k時%i分%s秒') AS created_at FROM messages M LEFT OUTER JOIN users U ON M.user_id = U.user_id WHERE M.board_id = ${boardId} ORDER BY M.created_at ASC`;
  connection.query(getBoardQuery, (getBoardQueryErr, board) => {
    connection.query(getMessagesQuery, (getMessagesQueryErr, messages) => {
      res.render('board', {
        title: board[0].title,
        board: board[0],
        messageList: messages
      });
    });
  });
});

router.post('/:board_id', (req, res) => {
  const { message } = req.body;
  const boardId = req.params.board_id;
  const userId = req.session.user_id ? req.session.user_id : 0;
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = `INSERT INTO messages (message, board_id, user_id, created_at) VALUES ('${message}', '${boardId}', '${userId}', '${createdAt}')`;
  connection.query(query, () => {
    res.redirect(`/boards/ + ${boardId}`);
  });
});

module.exports = router;
