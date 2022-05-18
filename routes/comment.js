import {Router} from "express";
import {postComment} from '../controllers/comment.js'

const router = Router()

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: comment command
 *     parameters:
 *         itemId: the dish id
 *         name: the name of a person who make this comment
 *         content: the content of the commot posted
 *         time: when the comment was made
 *         rate: give the rate to the dish
 *         imgUrl: poster's image url, if NULL, set empty string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post('/comment', postComment)

export default router
