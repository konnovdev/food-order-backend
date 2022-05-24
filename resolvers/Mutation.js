import {pubsub} from "./context.js"
import {dbMutation, dbQuery} from "../db/connection.js"
import {queryAllItem, queryItemById, queryAllOrder} from "../db/utility.js"
import { createOrder as createOrderDb } from "../db/utility.js"
import {DEFAULT_ITEM_STATUS_ENABLE, DEFAULT_ITEM_STATUS_DISABLE} from "../constant/constant.js"
import path from "path"
import fs from "fs"
import { v4 as uuidv4 } from "uuid"
// ! passing context from Appolo server constructor is not working
const Mutation = {
    singleUpload: async (parent, {file}) => {
        console.log("file", file)
        const { createReadStream, filename, mimetype, encoding } = await file.file;
        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        

        const pathName = path.join(path.resolve(), `/public/images/${filename}`)
        console.log("pathName", pathName)
        const stream = createReadStream();
        await stream.pipe(fs.createWriteStream(pathName))

        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.
        

        return { url: `${filename}`};
    },
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
        let orderPub = await queryAllOrder()
        console.log("orderPub", orderPub)
        // await dbMutation(`INSERT INTO \`Order_Item_Info\` VALUES('${order.id}', '${order.tableNo}', ${order.totalPrice}, '${order.time}' )`)
        pubsub.publish('order', {
            order: orderPub
            
        })
        return "success"
    },
    async createItem(parent, {data, file}, {}, info){
        console.log("recevied data:", data)
        let itemId = "item"+uuidv4()
        let sql = `INSERT INTO \`Item\` VALUES('${itemId}', '${itemId}.jpeg', ${data.price}, '${DEFAULT_ITEM_STATUS_ENABLE}' )`
        try{
            let result = await dbMutation(sql)
        }catch(e){
            console.log("Fail sql: ", sql, e)
        }
        sql = `INSERT INTO \`Item_Trans\` VALUES('${uuidv4()}','zh', '${data.name}' , 'description', 'type', '${itemId}')`
        try{
            await dbMutation(`INSERT INTO \`Item_Trans\` VALUES('${uuidv4()}','zh', '${data.name}' , '${data.description}', '${data.type}', '${itemId}')`)
            await dbMutation(`INSERT INTO \`Item_Trans\` VALUES('${uuidv4()}','en', '${data.englishName}' , '${data.englishDescription}', '${data.englishType}', '${itemId}')`)
        }catch(e){
            console.log("Fail sql: ", sql, e)
        }
        //! schema input type is not well defined, so we cannot insert full info into db
        let result = await queryItemById(itemId)
        
        //* handle upload image
        console.log("file", file)
        try{
            const { createReadStream, filename, mimetype, encoding } = await file.file;
            // Invoking the `createReadStream` will return a Readable Stream.
            // See https://nodejs.org/api/stream.html#stream_readable_streams
        
            const pathName = path.join(path.resolve(), `/public/images/${itemId}.jpeg`)
            console.log("pathName", pathName)
            const stream = createReadStream();
            await stream.pipe(fs.createWriteStream(pathName))
    
            // This is purely for demonstration purposes and will overwrite the
            // local-file-output.txt in the current working directory on EACH upload.
        }catch (e){
            console.log("fail upload image", file, e)
        }

        

        return result
    },
    async updateItem(parent, {id, data, file}, {}, info){
        let itemId = id
        let currentItem = await queryItemById(id)
        console.log("data.id", id)
        try{
            let sql = `UPDATE \`Item\`
            SET \`price\` = '${data.price}', \`img\` = '${itemId}.jpeg'
            WHERE \`id\`= '${id}'`
            await dbMutation(sql)
        }catch(e){
            console.log("fail update price and img", e)
        }
        try{
            let sql = `UPDATE \`Item_Trans\`
            SET \`name\` = '${data.name}', \`description\` = '${data.description}', \`type\` = '${data.type}'
            WHERE \`itemId\`= '${currentItem.id}' AND \`lang\`= 'zh'`
            await dbMutation(sql)
        }catch(e){
            console.log("fail update name", e)
        }
        
        try{
            let sql = `UPDATE \`Item_Trans\`
            SET \`name\` = '${data.englishName}', \`description\` = '${data.englishDescription}', \`type\` = '${data.englishType}'
            WHERE \`itemId\`= '${currentItem.id}' AND \`lang\`= 'en'`
            await dbMutation(sql)
        }catch(e){
            console.log("fail update name", e)
        }
        // handle update image
        console.log("file", file)
        try{
            const { createReadStream, filename, mimetype, encoding } = await file.file;
            // Invoking the `createReadStream` will return a Readable Stream.
            // See https://nodejs.org/api/stream.html#stream_readable_streams
        
            const pathName = path.join(path.resolve(), `/public/images/${itemId}.jpeg`)
            console.log("pathName", pathName)
            const stream = createReadStream();
            await stream.pipe(fs.createWriteStream(pathName))
    
            // This is purely for demonstration purposes and will overwrite the
            // local-file-output.txt in the current working directory on EACH upload.
        }catch (e){
            console.log("fail upload image", file, e)
        }
        
        return await queryItemById(id)

    },
    async deleteItem(parent, {id}, {}, info){
        //todo delete item and at the same time delete image file
        // todo discuss with frontend stuff the return data
        let allItem = await queryAllItem()
        let [result] = allItem.filter(e=>e.itemId===id)
        try{
            await dbMutation(`UPDATE \`Item\` 
            SET \`status\` = '${DEFAULT_ITEM_STATUS_DISABLE}'
            WHERE \`id\`='${id}'`)
        }catch(e){
            console.log("fail delete item", item, e)
        }

        return result
    },
    async updateOrderItemState(parent, {orderId, itemId, state}, {}, info){
        console.log("updateOrderItemState received", orderId, itemId, state)
        try{
            let sql = `UPDATE \`Order_Item_Info\`
            SET \`state\` = '${state}'
            WHERE \`itemId\`= '${itemId}' AND \`orderId\`='${orderId}'`
            await dbMutation(sql)
            
        }catch(e){
            console.log("fail update item state", e)
        }
        console.log("finish update db")
        let orderPub = await queryAllOrder()
        
        console.log("orderPub", orderPub)
        pubsub.publish('order', {
            order: orderPub
            
        })
        return result
    },
}

export default Mutation

// for frontend test gql string
// mutation createOrder{
//     createOrder(order:{id:"orderId", tableNo:"tableNo", items:[{name:"itemName", quantity:4}]})
//   }