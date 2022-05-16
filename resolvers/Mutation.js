import {pubsub} from "./context.js"
import { orderList, addToOrderList } from "../controllers/order.js"
import {dbMutation, dbQuery} from "../db/connection.js"
import {queryAllItem, queryItemById} from "../db/utility.js"
import { createOrder as createOrderDb } from "../db/utility.js"
// ! passing context from Appolo server constructor is not working
const Mutation = {
    async createOrder(parent, {order}, {}, info){
        let tmp = JSON.parse(JSON.stringify(order))
        console.log("received new order", order)
        await createOrderDb(order)
        let publishData = {
            id: order.id,
            tableNo: order.tableNo,
            totalPrice: order.totalPrice,
            time: order.time,
            items: order.items.map((item)=>{
                return{
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    orderItemInfo:{
                        quantity: item.quantity,
                        note: item.note
                    }
                }
            })

        }
        pubsub.publish('order', {
            order:{
                mutation: "CREATED",
                data: publishData
            }
        })
        return "success"
    },
    async createItem(parent, {data}, {}, info){
        console.log("recevied data:", data)
        let itemId = "item"+Math.floor(Math.random()*1000)
        let sql = `INSERT INTO \`Item\` VALUES('${itemId}', '${data.img}', ${data.price} )`
        try{
            let result = await dbMutation(sql)
        }catch(e){
            console.log("Fail sql: ", sql, e)
        }
        sql = `INSERT INTO \`Item_Trans\` VALUES('${Math.floor(Math.random()*1000)}','zh', '${data.name}' , 'description', 'type', '${itemId}')`
        try{
            let result = await dbMutation(`INSERT INTO \`Item_Trans\` VALUES('${Math.floor(Math.random()*1000)}','zh', '${data.name}' , 'description', 'type', '${itemId}')`)
        }catch(e){
            console.log("Fail sql: ", sql, e)
        }
        //! schema input type is not well defined, so we cannot insert full info into db
        let result = await queryItemById(itemId)
        return result
    },
    async updateItem(parent, {id, data}, {}, info){

        let currentItem = await queryItemById(id)

        try{
            let sql = `UPDATE \`Item\`
            SET \`price\` = '${data.price}', \`img\` = '${data.img}'
            WHERE \`id\`= '${id}'`
            await dbMutation(sql)
        }catch(e){
            console.log("fail update price and img", e)
        }
        try{
            let sql = `UPDATE \`Item_Trans\`
            SET \`name\` = '${data.name}'
            WHERE \`itemId\`= '${currentItem.id}'`
            await dbMutation(sql)
        }catch(e){
            console.log("fail update name", e)
        }
        return await queryItemById(id)

    },
    async deleteItem(parent, {id}, {}, info){
        let allItem = await queryAllItem()
        let [result] = allItem.filter(e=>e.itemId===id)
        await dbMutation(`DELETE FROM \`Item\` WHERE \`id\`='${id}'`)
        return result
    }
}

export default Mutation

// for frontend test gql string
// mutation createOrder{
//     createOrder(order:{id:"orderId", tableNo:"tableNo", items:[{name:"itemName", quantity:4}]})
//   }