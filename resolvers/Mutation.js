import {pubsub} from "./context.js"
import { orderList, addToOrderList } from "../controllers/order.js"
import {dbMutation, dbQuery} from "../db/connection.js"
import {queryAllItem, queryItemById} from "../db/utility.js"
import { createOrder as createOrderDb } from "../db/utility.js"
import path from "path"
import fs from "fs"
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
        pubsub.publish('order', {
            order:{
                mutation: "CREATED",
                data: publishData
            }
        })
        return "success"
    },
    async createItem(parent, {data, file}, {}, info){
        console.log("recevied data:", data)
        let itemId = "item"+Math.floor(Math.random()*1000)
        let sql = `INSERT INTO \`Item\` VALUES('${itemId}', '${itemId}.jpeg', ${data.price} )`
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
        
        //* handle upload image
        console.log("file", file)
        const { createReadStream, filename, mimetype, encoding } = await file.file;
        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
    
        const pathName = path.join(path.resolve(), `/public/images/${itemId}.jpeg`)
        console.log("pathName", pathName)
        const stream = createReadStream();
        await stream.pipe(fs.createWriteStream(pathName))

        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.
        

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
            SET \`name\` = '${data.name}'
            WHERE \`itemId\`= '${currentItem.id}'`
            await dbMutation(sql)
        }catch(e){
            console.log("fail update name", e)
        }
        // handle update image
        console.log("file", file)
        const { createReadStream, filename, mimetype, encoding } = await file.file;
        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
    
        const pathName = path.join(path.resolve(), `/public/images/${itemId}.jpeg`)
        console.log("pathName", pathName)
        const stream = createReadStream();
        await stream.pipe(fs.createWriteStream(pathName))

        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.
        
        return await queryItemById(id)

    },
    async deleteItem(parent, {id}, {}, info){
        //todo delete item and at the same time delete image file
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