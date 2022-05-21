import path from "path";
import https from "https"

const gettotalprice = (cart) => {
  let sum = 0;
  cart.map((obj) => {
    sum += obj.price * obj.dishesNum;
  });
  return sum;
};

const postPayment = async (req, res) => {
    console.log("req.body", req.body)
    const cart = req.body.cart
  
    let details = ""
    for (let i = 0; i < cart.length; i++){
      details += cart[i].name + " X " + cart[i].dishesNum + "\n" 
    }
    const post_data = {
        // prime from front-end
        "prime": req.body.prime,
        // "partner_key": process.env.PARENT_KEY,
        "partner_key":"partner_wcxH5GX2HMLk9p2WpfOYSWseWOyn0mE0K1VwqjIZAgDGCsRZ4BEqMCaL",
        // "merchant_id": process.env.MERCHANT_ID,
        "merchant_id":"QuickOrder_LINEPAY",
        // 金額
        "amount": gettotalprice(cart),
        "currency": "TWD",
        "details": details,
        // 會員可以打這些資訊
        "cardholder": {
            "phone_number": "+886923456789",
            "name": "hello",
            "email": "example@gmail.com"
        },
        // 分期付款
        "instalment": 0,
        "remember": false,
        "line_pay_product_image_url":"https://i.postimg.cc/2869N4CP/logo512.png",
        "result_url":{"frontend_redirect_url":"https://google.com", "backend_notify_url":"https://google.com"}
    }
    const post_options = {
      // host: 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime',
      host: 'sandbox.tappaysdk.com',
      port: 443,
      path: '/tpc/payment/pay-by-prime',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'partner_wcxH5GX2HMLk9p2WpfOYSWseWOyn0mE0K1VwqjIZAgDGCsRZ4BEqMCaL'
      }
    }
  
    let data = "123\n\n\n"
    const post_req = https.request(post_options,function(response) {
        response.setEncoding('utf8');
  
        response.on('data', function (body) {
            console.log(body)
            data =  body
            res.json(JSON.parse(body))
        });
        response.on('end', () => { 
          //no more data in response
          // const body = JSON.parse(data); 
        return data
        }); 
    })
    post_req.on('error', (error) => { 
        console.log('An error', error); 
    }); 
    post_req.write(JSON.stringify(post_data));
    post_req.end();
  
    console.log(data)
    return data
  
    
  }

  export {postPayment}