import { dbMutation } from "../db/connection.js"
import { v4 as uuidv4 } from "uuid"

const postComment = async(req, res)=>{
    console.log("postComment received: ", req.body)

    // todo add data into db
    let commentId = uuidv4()
    try{
        dbMutation(`INSERT INTO \`Comment\` VALUES('${commentId}', '${req.body.name}', '${req.body.content}', '${req.body.time}', ${req.body.rate}, '${req.body.imgUrl}' )`)
    }catch(e){
        console.log(e)
        res.status(500).send("fail")
    }
    let itemCommentId = uuidv4()
    try{
        dbMutation(`INSERT INTO \`Item_Comment\` VALUES('${itemCommentId}', '${req.body.itemId}', '${commentId}' )`)
    }catch(e){
        console.log(e)
        res.status(500).send("fail")
    }

    res.status(200).send("success")
    
}

export {postComment}