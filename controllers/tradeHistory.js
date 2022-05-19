const postHistory = async (req, res) => {
	const trade_id = req.body.trade_id;

	const tradeResult = await axios.post(
		"https://sandbox.tappaysdk.com/tpc/transaction/trade-history",
		{
			partner_key:
				"partner_wcxH5GX2HMLk9p2WpfOYSWseWOyn0mE0K1VwqjIZAgDGCsRZ4BEqMCaL",
			rec_trade_id: trade_id,x
		},
		{
			headers: {
				"Content-Type": "application/json",
				"x-api-key":
					"partner_wcxH5GX2HMLk9p2WpfOYSWseWOyn0mE0K1VwqjIZAgDGCsRZ4BEqMCaL",
			},
		}
	);

	return tradeResult;
};
export {postHistory}