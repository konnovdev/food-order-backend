import e from "express"
import {queryAllItem, queryAllOrder} from "../db/utility.js"
const Query = {
    queryTest(parent, {}, {}, info){
        console.log("queryTest")
        return "TEST"
    },


    async items(parent, {}, {db}, info){
        // let result = await queryAllItem(lang)
        let result = await queryAllItem()
        console.log("result", result)
        return result
    },
    async todayOrders(parent, {}, {db}, info){
        console.log("todayOrders")
        let orderList = await queryAllOrder()
        return orderList
    },
    async itemAllLang(parent, {}, {}, info){
        let itemDefaultLang = await queryAllItem()
        let itemEng = await queryAllItem("en")

        let combineTwoLang = []
        itemDefaultLang.forEach((e1)=>{
            itemEng.forEach((e2)=>{
                if (e1.id==e2.id){

                    combineTwoLang = [...combineTwoLang, {...e1,
                        englishType: e2.type,
                        englishDescription: e2.description,
                        englishName: e2.name
                    }]
                }
            })
        })

        return combineTwoLang
    },
}

let lang = ""

function setLang(language) {
    lang = language
}

export {Query, setLang};