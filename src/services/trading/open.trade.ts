import { Ticker } from 'ccxt'
import { chatId, telegramBot } from '../../server'
import { Side, Trade } from '../../entities/trade.entities'
import { info } from '../console.logger'
import { calcStopLoss } from './helpers/calcStopLoss'
import { calcTakeProfits } from './helpers/calcTakeProfits'
import { TradingAccount } from './trading.account'
import { TradingExecutor } from './trading.executor'

export const openTrade = async (trade: Trade) => {
  const account = TradingAccount.getInstance()

  try {
    const {
      direction,
      symbol,
      leverage,
      stopLoss,
      takeProfit,
      price,
      size,
      takeProfitLevels,
    } = trade

    if (symbol === 'BTC/TUSD') {
      const ticker: Ticker = await account.getTicker(symbol)
      const { tokens } = await account.getOpenOrderOptionsBtc(trade, ticker)
      let order = await account.createMarketOrder(symbol, direction, tokens)

      if (order.status === 'closed' || order.status === 'open') {
        telegramBot.sendMessage(
          chatId,
          `Buy for ${symbol} at ${ticker.last} is ${order.status}`
        )

        info(`Buy for ${symbol} at ${ticker.last} is ${order.status}`)
      } else {
        telegramBot.sendMessage(chatId, `Buy for ${symbol} failed`)
      }

      return order
    }

    if (TradingExecutor.TradeCount >= TradingExecutor.MaxTrades) {
      telegramBot.sendMessage(chatId, 'Max trades reached')
      return
    }

    const ticker: Ticker = await account.getTicker(symbol)
    const { tokens } = await account.getOpenOrderOptions(trade, ticker)

    let order = await account.createMarketOrder(symbol, direction, tokens)

    if (order.status === 'closed' || order.status === 'open') {
      TradingExecutor.addTrade()
      telegramBot.sendMessage(
        chatId,
        `Buy for ${symbol} at ${ticker.last} is ${order.status} : Trade Count ${TradingExecutor.TradeCount}`
      )

      info(
        `Buy for ${symbol} at ${ticker.last} is ${order.status} : Trade Count ${TradingExecutor.TradeCount}`
      )
    } else {
      telegramBot.sendMessage(chatId, `Buy for ${symbol} failed`)
    }

    return order
  } catch (error) {
    throw error
  }
}
