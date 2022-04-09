const getOrderById = (id, orderList) => {
    let order = orderList.filter((e)=>e.id===id)
    return order 
}

export {getOrderById} 