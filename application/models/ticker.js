'use strict'

class Ticker {
  constructor() {
    this.tickers = []
    this.count = 0;
  }

  createTicker(ticker, cb) {
    if (ticker.hasOwnProperty('symbol') && ticker.hasOwnProperty('price')) {
      let
        symbol = ticker.symbol.toUpperCase(),
        price = ticker.price,
        foundTicker = this.getTicker(symbol)

      if (!foundTicker) this.tickers.push({id: ++this.count, symbol: symbol, price: [price]})
      else foundTicker.price.push(price)
      console.log('tickers', this.tickers)
      if (cb) cb(0, {symbol, price})
    }
    else {
      if (cb) cb(1)
    }
  }

  getTickerAvgPrice(symbol, cb) {
    if (symbol) {
      let
        sum = 0,
        avgPrice = 0,
        count = 0,
        limit = 10

      symbol = symbol.toUpperCase()

      let foundTicker = this.getTicker(symbol)

      if (foundTicker) {
        const len = foundTicker.price.length
        for (let i = len - 1; i >= 0 && count < limit; i--) {
          sum += parseFloat(foundTicker.price[i])
          count++
        }
        console.log(count)
        console.log(sum)
        avgPrice = parseFloat(sum / count).toFixed(2)
        if (cb) return cb(0, {symbol, avgPrice})
      }
      else {
        if (cb) return cb(1)
      }
    }
    else {
      if (cb) return cb(1)
    }
  }

  getTicker(symbol) {
    return this.tickers.find((elem) => elem.symbol === symbol)
  }
}

module.exports = new Ticker()
