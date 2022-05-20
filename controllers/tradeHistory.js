import https from "https";
import dotenv from 'dotenv'
dotenv.config()

const postHistory = async (req, res) => {
console.log("postHistory received:", req.body)
const trade_id = req.body.trade_id;
const data = JSON.stringify({
    partner_key:
    process.env.x-api-key,
    rec_trade_id: trade_id,
    });
const options = {
    hostname: "sandbox.tappaysdk.com",
    port: 443,
    path: "/tpc/transaction/trade-history",
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "x-api-key":
        "partner_wcxH5GX2HMLk9p2WpfOYSWseWOyn0mE0K1VwqjIZAgDGCsRZ4BEqMCaL",
    },
};

const req1 = https.request(options, (response) => {
    // console.log(`statusCode: ${res.statusCode}`);
    response.on("data", (chunk) => {
    console.log("get data from backend", JSON.parse(chunk))
    res.json(JSON.parse(chunk))

    });
});

req1.on("error", (error) => {
    console.error(error);
});

req1.write(data);
req1.end();


// const tradeResult = await axios.post(
//     "https://sandbox.tappaysdk.com/tpc/transaction/trade-history",
//     {
//     partner_key:
//         "partner_wcxH5GX2HMLk9p2WpfOYSWseWOyn0mE0K1VwqjIZAgDGCsRZ4BEqMCaL",
//     rec_trade_id: trade_id,
//     },
//     {
//     headers: {
//         "Content-Type": "application/json",
//         "x-api-key":
//         "partner_wcxH5GX2HMLk9p2WpfOYSWseWOyn0mE0K1VwqjIZAgDGCsRZ4BEqMCaL",
//     },
//     }
// );
// const post_data = {};
// const post_req = https.request(post_options, function (response) {
//     response.setEncoding("utf8");
//     response.on("data", function (body) {
//     console.log(body);
//     data = body;
//     res.json(JSON.parse(body));
//     });
//     response.on("end", () => {
//     //no more data in response
//     // const body = JSON.parse(data);
//     return data;
//     });
// });
// post_req.on("error", (error) => {
//     console.log("An error", error);
// });
// post_req.write(JSON.stringify(post_data));
// post_req.end();
// console.log(data);
// return tradeResult;
};
export { postHistory };
