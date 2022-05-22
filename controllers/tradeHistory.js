import https from "https";
import dotenv from 'dotenv'
dotenv.config()

const postHistory = async (req, res) => {
console.log("postHistory received:", req.body)
const trade_id = req.body.trade_id;
const data = JSON.stringify({
    partner_key:
    process.env.X_API_KEY,
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
        process.env.X_API_KEY,
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

};
export { postHistory };
