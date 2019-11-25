'use strict'

const
  express = require('express'),
  router = express.Router(),
  jwt = require('../../utils/jwt'),
  tickerModel = require('../../models/ticker'),
  common = require('../../utils/common'),
  verifyToken = jwt.verifyToken

router.get('/tickers/:symbol/token/:token', verifyToken, (user, req, res, next) => {
  const
    symbol = req.params.symbol,
    recentNum = 10

  if (symbol) {
    tickerModel.getTickerAvgPrice(symbol, (error, ticker) => {
      if (error) return res.status(500).json({success: 0, message: 'Internal Error'})
      return res.status(200).json({success: 1, ticker: {symbol: ticker.symbol, avgPrice: ticker.avgPrice}})
    })
  }
})

router.post('/tickers', (req, res) => {
  common.getPostData(req, res, (data) => {
    let
      symbol = data.symbol,
      price = parseFloat(data.price).toFixed(2),
      ticker = {symbol: symbol, price: price}

    tickerModel.createTicker(ticker, (error, ticker) => {
      if (error) {
        return res.status(500).json({success: 0, message: 'Internal Error'})
      }
      return res.status(200).json({success: 1, ticker: {symbol: ticker.symbol, price: ticker.price}})
    })
  })
})

module.exports = router
