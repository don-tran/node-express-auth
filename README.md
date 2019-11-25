For the sake of simplicity, we will ignore input validation and username existing check

Endpoint to register an account (username/password):
  POST http://localhost:3000/user/register
  payload: {"username":"mike","password":"pass"}

Endpoint to log a user in, which returns a session token:
  POST http://localhost:3000/user/login
  payload: {"username":"mike","password":"pass"}

Function to validate the session token:
  verifyToken

Endpoint to receive a webhook with a stock ticker symbol and price (this needs to be unauthenticated):
  POST http://localhost:3000/api/tickers
  payload: {"symbol":"APPL","price":"100.50"}

Endpoint to return the averages of the 10 most recent prices for a given ticker symbol:
  GET http://localhost:3000/api/tickers/symbol/token/yourToken
  For example:
    http://localhost:3000/api/tickers/APPL/token/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJwYXNzd29yZCI6InBhc3MyIiwidHMiOiJNb24sIDI1IE5vdiAyMDE5IDAyOjQ3OjM0IEdNVCJ9.ZiIkjLtJNuFQjFemQIYXn2syxvJ3Tt1yt4vtPjUizeQ
