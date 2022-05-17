
const getOrderById = (id, orderList) => {
    let order = orderList.filter((e)=>e.id===id)
    return order 
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
            "quantity": e1.quantity,
            "note": e1.note,
            ...itemObj[itemId]
        }]
    })

    return orderItemObj
}
const prepareOrderIdList = (orderItemResult)=>{
    // to create a list of all orderId
    let orderIdList = []
        orderItemResult.forEach((e)=>{
            if (!orderIdList.includes(e.orderId))
                orderIdList = [...orderIdList, e.orderId]
    })
    return orderIdList
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


export {getOrderById, 
    prepareItem, 
    preapreOrderItem, 
    prepareOrderIdList,
    prepareOrderList,
} 