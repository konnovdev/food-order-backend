import { dbQuery } from "./connection.js"
const handleComment = (itemTransResult, itemCommentResult, commentResult)=>{
    // handle comments
    let itemCommentObj = {}
    let itemList = []
    itemTransResult.forEach((e)=>{
        itemList = [...itemList, e.itemId]
        itemCommentObj[e.itemId] = []
    })

    itemCommentResult.forEach((e1)=>{
        commentResult.forEach((comment)=>{
            if (e1.commentId===comment.id){
                itemCommentObj[e1.itemId] = [...itemCommentObj[e1.itemId],
                 {name: comment.name,
                    id: comment.id,
                    content: comment.content,
                    time: comment.time
                }]
            }
        })
    })
    return itemCommentObj
}


const queryAllItem = async()=>{
    let itemTransResult
    let itemResult
    let itemCommentResult
    let commentResult

    try{
        itemTransResult = await dbQuery('SELECT * FROM `Item_Trans` WHERE `lang`=\'zh\'')
    }catch(e){
        console.log("Fail itemTransResult", e)
    }
    try{
        itemResult = await dbQuery('SELECT * FROM `Item`')
    }catch(e){
        console.log("Fail itemResult", e)
    }
    try{
        itemCommentResult = await dbQuery('SELECT * FROM `Item_Comment`')
    }catch(e){
        console.log("Fail itemCommentResult", e)
    }
    try{
        commentResult = await dbQuery('SELECT * FROM `Comment`')
    }catch(e){
        console.log("Fail commentResult", e)
    }
    
    let result = []

    let itemCommentObj = handleComment (itemTransResult, itemCommentResult, commentResult)

    // combine three tables
    itemResult.forEach((e1)=>{
        itemTransResult.forEach((e2)=>{
          if (e1.id===e2.itemId){
              result = [...result, {...e1, ...e2, comments:itemCommentObj[e2.itemId], id:e2.itemId}]
          }

        })
    })
    // console.log("finish queryAllItem", result)
    return result
}

const queryItemById = async (id)=>{
    // todo modify this function to query db directly
    let allItems = await queryAllItem()
    let [result] = allItems.filter(item=>item.itemId===id)
    // console.log(allItems)
    return result
}
export {queryAllItem,
    queryItemById
}