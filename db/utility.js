import { dbQuery, dbMutation } from "./connection.js"
const handleComment = (itemTransResult, itemCommentResult, commentResult)=>{
    // handle comments
    let itemCommentObj = {}
    let itemList = []
    itemTransResult.forEach((e)=>{
        itemList = [...itemList, e.itemId]
        itemCommentObj[e.itemId] = []
    })
    console.log("itemCommentResult", itemCommentResult)
    itemCommentResult.forEach((e1)=>{
        commentResult.forEach((comment)=>{
            if (e1.commentId===comment.id){
                itemCommentObj[e1.itemId] = [...itemCommentObj[e1.itemId],
                 {name: comment.name,
                    id: comment.id,
                    content: comment.content,
                    time: comment.time,
                    rate:comment.rate
                }]
            }
        })
    })
    // console.log("itemCommentObj", itemCommentObj)
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
    return result
}

const queryItemById = async (id)=>{
    // todo modify this function to query db directly
    let allItems = await queryAllItem()
    let [result] = allItems.filter(item=>item.itemId===id)
    // console.log(allItems)
    return result
}

const createOrder = async (order)=>{
    // todo is there a way to make these query a transaction?
    try{
        await dbMutation(`INSERT INTO \`Order\` VALUES('${order.id}', '${order.tableNo}', ${order.totalPrice}, '${order.time}' )`)
        order.items.forEach(async (item)=>{
            let Order_Item_InfoId = order.id+"_"+item.id
            await dbMutation(`INSERT INTO \`Order_Item_Info\` VALUES('${Order_Item_InfoId}', '${order.id}', '${item.id}', '${item.quantity}', '${item.note}')`)
    
            // let Order_ItemId = "Order_Item" + Math.floor(Math.random()*1000)
            await dbMutation(`INSERT INTO \`Order_Item\` VALUES('${order.id}', '${order.id}', '${item.id}', '${Order_Item_InfoId}')`)
        })
        
    }catch(e){
        console.log(e)
    }
}


export {queryAllItem,
    queryItemById,
    createOrder
}