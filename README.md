# ID1212-API-Server
A small API server for calculations for the course ID1212
Given the scenario that you have funds in a swedish fund account, this API calculates the differences between holding the funds or selling it, and therefore taxing 30%, and then buying the same in an ISK account with a different taxation.
Returns a JSON object with the estimated yearly valuation of an ISK account vs a Fund account given the scenario above.
Call upon it with http://localhost:3000/tax/?start_capital=value&profit_capital=value&years=value&interest_rate=value
Where value is an integer number, the start capital is the start value in which you bought the funds, the profit capital is whatever profit has been made since buying it, 
years are how many years ahead you want to calculate and interest rate is what you expect/hope the yearly percentage increase is of the fund. 
