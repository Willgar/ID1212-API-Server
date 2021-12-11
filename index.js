var express = require("express");
var app = express();
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})
app.get("/tax", (req, res) => {
  var start_capital = req.query.start_capital;
  var profit_capital = req.query.profit_capital;
  var interest_rate = req.query.interest_rate;
  var years = req.query.years;

  console.log(years, start_capital, interest_rate, profit_capital);
  res.json(calculateFundToISK(start_capital, profit_capital, interest_rate, years));
});

function calculateFundToISK(start_capital, profit_capital, interest_rate, years)
	{
    start_capital = parseInt(start_capital);
    profit_capital = parseInt(profit_capital);
    interest_rate = parseInt(interest_rate);
    years = parseInt(years);
		var total_capital_ISK = (start_capital + (profit_capital * 0.7));
    var total_capital_fund = (start_capital + profit_capital);

		var yearly_value = Array(2).fill(0.0).map(() => new Array(years).fill(0.0));
		yearly_value[0][0] = Math.round(total_capital_ISK);

		yearly_value[1][0] = Math.round((total_capital_fund - start_capital) * 0.7 + start_capital);
		for (var i = 1; i < years; i++)
		{
			total_capital_ISK = total_capital_ISK * ((interest_rate / 100.0) + 1) - (total_capital_ISK * 0.00375);
			yearly_value[0][i] = Math.round(total_capital_ISK);
			total_capital_fund = total_capital_fund * ((interest_rate / 100.0) + 1);
			yearly_value[1][i] = Math.round((total_capital_fund - start_capital) * 0.7 + start_capital);
		}
    var json = {
      "isk": yearly_value[0],
      "fund": yearly_value[1]
    }
    return json
	}

app.listen(process.env.PORT || 3000, () => {
   console.log("Server running on port 3000");
});
