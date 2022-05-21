import { dbQuery, dbMutation } from "./connection.js"
import path from "path"
import {STATUS_UNREADY} from "./constant.js"
const handleComment = (itemTransResult, itemCommentResult, commentResult)=>{
    // handle comments
    let itemCommentObj = {}
    let itemList = []
    itemTransResult.forEach((e)=>{
        itemList = [...itemList, e.itemId]
        itemCommentObj[e.itemId] = []
    })
    // console.log("itemCommentResult", itemCommentResult)
    itemCommentResult.forEach((e1)=>{
        commentResult.forEach((comment)=>{
            if (e1.commentId===comment.id){
                itemCommentObj[e1.itemId] = [...itemCommentObj[e1.itemId],
                {name: comment.name,
                    id: comment.id,
                    content: comment.content,
                    time: comment.time,
                    rate:comment.rate,
                    imgUrl: comment.imgUrl
                }]
            }
        })
    })
    // console.log("itemCommentObj", itemCommentObj)
    return itemCommentObj
}
const makeImgUrl = (imgFromDb)=>{
    // todo is there a way to get current backend url?
    let urlBase = "https://49e6-150-117-240-26.ngrok.io"
    let imgUrl  = path.join(urlBase, "images", imgFromDb) 
    return imgUrl
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
                result = [...result, {...e1,
                    ...e2,
                    comments:itemCommentObj[e2.itemId],
                    id:e2.itemId,
                    img: makeImgUrl(e1.img)
                }]
            }

        })
    })
    // console.log("result", result)
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

            await dbMutation(`INSERT INTO \`Order_Item_Info\` VALUES('${Order_Item_InfoId}', '${order.id}', '${item.id}', ${item.quantity}, '${item.note}', '${STATUS_UNREADY}')`)

    
            
            await dbMutation(`INSERT INTO \`Order_Item\` VALUES('${order.id}', '${order.id}', '${item.id}', '${Order_Item_InfoId}')`)
        })
    }catch(e){
        console.log(e)
    }
}

const prepareOrderIdList = (orderResult)=>{
    // to create a list of all orderId
    let orderIdList = []
        orderResult.forEach((order)=>{
            if (!orderIdList.includes(order.id))
                orderIdList = [...orderIdList, order.id]
    })
    return orderIdList
}
const prepareItem = (itemTransResult, itemResult) =>{
    // prepare orderItemObj: itemId as a key
    let itemObj = {}
    itemTransResult.forEach((item)=>{
        itemResult.forEach((e)=>{
            if (item.itemId===e.id){
                itemObj[item.itemId] = {...item, ...e}
            }
        })
    })
    return itemObj
}
const preapreOrderItem = (orderIdList, orderItemInfoResult, itemObj)=>{
    // prepare orderItemObj: order.id as a key, content of order as a value
    let orderItemObj = {}
    orderIdList.forEach((e)=>{
        orderItemObj[e] = {"items":[]}
    })
    
    // put items into orderItemObj
    orderItemInfoResult.forEach((e1)=>{
        let orderId = e1.orderId
        let itemId = e1.itemId
        orderItemObj[orderId]["items"] = [...orderItemObj[orderId]["items"], {
            "id": itemId,
            "orderItemInfo":{
                "quantity": e1.quantity,
                "note": e1.note,
                "state": e1.state
            },
            ...itemObj[itemId]
        }]
    })
    console.log("orderItemObj", orderItemObj) 
    return orderItemObj
}
const prepareOrderList = (orderIdList, orderResult, orderItemObj)=>{
    // prepare orderList by combine orderItemObj and orderResult
    let orderList = []
    orderIdList.forEach((orderId)=>{
        orderResult.forEach((e2, index)=>{
            if (orderId===e2.id){
                orderList = [...orderList, {...orderResult[index], "items":orderItemObj[orderId]["items"]}]
            }
        })
    })
    return orderList
}
const queryAllOrder = async ()=>{
    let orderResult = await dbQuery('SELECT * FROM `Order`')
    let orderItemResult = await dbQuery('SELECT `orderId`, `itemId`, `orderItemInfoId` FROM `Order_Item`')
    let orderItemInfoResult = await dbQuery('SELECT * FROM `Order_Item_Info`')
    let itemTransResult = await dbQuery('SELECT * FROM `Item_Trans` WHERE `lang`=\'zh\'')
    let itemResult = await dbQuery('SELECT * FROM `Item`')
    // to create a list of all orderId
    let orderIdList = prepareOrderIdList(orderResult)
    console.log("orderIdList", orderIdList)
    // prepare orderItemObj: itemId as a key
    let itemObj = prepareItem(itemTransResult, itemResult)

    // prepare orderItemObj: order.id as a key, content of order as a value
    let orderItemObj = preapreOrderItem(orderIdList, orderItemInfoResult, itemObj)

    // prepare orderList by combine orderItemObj and orderResult
    let orderList = prepareOrderList(orderIdList, orderResult, orderItemObj)
    console.log("finish order queryAllOrder()")
    return orderList
}


export {queryAllItem,
    queryItemById,
    createOrder,
    queryAllOrder
}