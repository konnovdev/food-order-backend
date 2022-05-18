import { dbMutation } from "../db/connection.js"

const postComment = async(req, res)=>{
    console.log("postComment received: ", req.body)

    // todo add data into db
    let commentId = Math.floor(Math.random()*10000)
    try{
        dbMutation(`INSERT INTO \`Comment\` VALUES('${commentId}', '${req.body.name}', '${req.body.content}', '${req.body.time}', ${req.body.rate}, '${req.body.imgUrl}' )`)
    }catch(e){
        console.log(e)
        res.status(500).send("fail")
    }
    let itemCommentId = Math.floor(Math.random()*10000)
    try{
        dbMutation(`INSERT INTO \`item_Comment\` VALUES('${itemCommentId}', '${req.body.itemId}', '${commentId}' )`)
    }catch(e){
        console.log(e)
        res.status(500).send("fail")
    }

    res.status(200).send("success")
    
}

export {postComment}