# Tradingview Alerts to Futures bot v.1.0 (Binance | Bybit)

## Getting started

An updated version of my previous Tradingview processor. This bot places orders from Tradingview signals (webhook) to Binance or Bybit Futures. The bot can easily be deployed to AWS Lightsail.

_Binance working 100%_

_Bybit working about 50%_
Symbols must be in a form of BTC/USDT:USDT to trade in perpetual futures
Things not working yet:

- setting stop loss
- setting take profits

The bot has a simple Telegram integration. Currently you can turn on / off trades with Telegram messages.

The bot does not store the trades. There is no database.

## AWS Lightsail

- Lightsail script created by using Mike Coleman (mikegcoleman/todo) Lightsail script. Thank you!
- echo script adds .env file on your server for Docker on Lightsail init

1. Launch AWS Lightsail Instance (OS Only, with at least 1GB of memory)
2. Choose Ubuntu 18
3. Add the starting script with your envs
4. Launch!

Starting script:

Note:
EXCHANGE_ID has to be binanceusdm (bybit might work too, not tested)
PAPER=true uses paper trading (Binance Futures Testnet)

```
mkdir /srv

echo 'TELEGRAM_TOKEN_LIVE=
TELEGRAM_CHAT_ID_LIVE=

PAPER=true
PAPER_EXCHANGE_ID=binanceusdm
PAPER_TRADING_API_KEY=
PAPER_TRADING_SECRET=

EXCHANGE_ID=binanceusdm
TRADING_API_KEY=
TRADING_SECRET=
' > /srv/.env

curl -o lightsail-deploy.sh https://raw.githubusercontent.com/artoruotsala/tradingview-alerts-futures-bot/master/lightsail-deploy.sh

chmod +x ./lightsail-deploy.sh

./lightsail-deploy.sh

```

## Example orders from Tradingview

- Use alert -> webhook to your bot http://url/trade :

Long trade with 5% of free capital (market price) and setting leverage to 20. You can leave leverage away from the request, and then the current leverage will be used. Notice that leverage has to be a number - not a string!

```
{
    "direction": "long",
    "symbol": "BTC/USDT",
    "size": "5%",
    "leverage": 20
}
```

Long trade with 5% of free capital (limit order = price), and stop loss (1.5% from close) and one take profit (close at profit level of 2%)

```
{
    "direction": "long",
    "symbol": "BTC/USDT",
    "size": "5%",
    "price": "22000",
    "stopLoss": "1.5%",
    "takeProfit": "2%"
}
```

Long trade with 250$ of capital (market price), and stop loss at 20000$ and one take profit at 25000$

```
{
    "direction": "long",
    "symbol": "BTC/USDT",
    "size": "250",
    "stopLoss": "20000",
    "takeProfit": "25000"
}
```

If your strategy has algorithm for dynamic trade sizes, you can use margin multiplier (trade size in this example 375$)

```
{
    "direction": "long",
    "symbol": "BTC/USDT",
    "size": "250",
    "margin": "1.5",
    "stopLoss": "20000",
    "takeProfit": "25000"
}
```

Short trade with 5% of free capital (market price), and stop loss at 2% and 3 take profits

1. First TP at 33% from the final take profit (size 33%)
2. Second TP at 66% from the final take profit (size 33%)
3. Final take profit level at 5%

```
{
    "direction": "short",
    "symbol": "BTC/USDT",
    "size": "5%",
    "stopLoss": "2%",
    "takeProfit": "5%",
    "takeProfitLevels": [
      {
        "price": "33%",
        "size": "33%"
      },
      {
        "price": "66%",
        "size": "33%"
      }
    ]
}
```

Close long or short trade (full trade with market price) and also close all open orders in that current symbol (stop loss + take profits)

```
{
    "direction": "close",
    "symbol": "BTC/USDT",
    "size": "100%"
}
```

Close 50% of long or short trade (with limit order = price).
{{close}} is a placeholder used in Tradingview alerts for getting the close price from the Tradingview stragegy

```

{
  "direction": "close",
  "symbol": "BTC/USDT",
  "size": "50%",
  "price": "{{close}}"
}

```

# Tradingview 警报到期货机器人 v1.0（币安 | Bybit）

## 入门指南

这是我之前的Tradingview处理器的更新版本。该机器人可以将Tradingview的信号（webhook）下单到币安或币拨的期货市场。该机器人可以轻松部署到 AWS Lightsail。

_币安工作情况100%_

_Bybit工作情况大约50%_
符号必须以 BTC/USDT:USDT 的形式来交易永续期货
目前尚未工作的事项：

- 设置止损
- 设置止盈

该机器人具有简单的Telegram集成。目前，您可以通过Telegram消息开启/关闭交易。

机器人不存储交易记录。没有数据库。

## AWS Lightsail

- Lightsail 脚本是使用 Mike Coleman (mikegcoleman/todo) 的Lightsail 脚本创建的。谢谢！
- echo 脚本会在您的服务器上为Lightsail初始化时的 Docker 添加一个 .env 文件

1. 启动 AWS Lightsail 实例（仅操作系统，至少需要1GB内存）
2. 选择 Ubuntu 18
3. 添加您的环境变量开始脚本
4. 启动！

开始脚本：

注意：
EXCHANGE_ID 必须是 binanceusdm（Bybit可能也行，未测试）
PAPER=true 使用模拟交易（币安合约测试网）

```
mkdir /srv

echo 'TELEGRAM_TOKEN_LIVE=
TELEGRAM_CHAT_ID_LIVE=

PAPER=true
PAPER_EXCHANGE_ID=binanceusdm
PAPER_TRADING_API_KEY=
PAPER_TRADING_SECRET=

EXCHANGE_ID=binanceusdm
TRADING_API_KEY=
TRADING_SECRET=
' > /srv/.env

curl -o lightsail-deploy.sh https://raw.githubusercontent.com/artoruotsala/tradingview-alerts-futures-bot/master/lightsail-deploy.sh

chmod +x ./lightsail-deploy.sh

./lightsail-deploy.sh

```

## Tradingview 中的示例订单

- 使用警报 -> webhook 至您的机器人 http://url/trade:

用5%的自由资本（市价）做多交易，并设置20倍杠杆。您可以不在请求中包含杠杆，然后将使用当前的杠杆。注意杠杆必须是数字 - 而不是字符串！

```
{
    "direction": "long",
    "symbol": "BTC/USDT",
    "size": "5%",
    "leverage": 20
}
```

用5%的自由资本（限价订单 = 价格），设定止损（从收盘价下跌1.5%）和一个止盈点（盈利水平2%时平仓）

```
{
    "direction": "long",
    "symbol": "BTC/USDT",
    "size": "5%",
    "price": "22000",
    "stopLoss": "1.5%",
    "takeProfit": "2%"
}
```

用250美元的资本（市价）做多交易，止损位于20000美元，一个止盈位于25000美元

```
{
    "direction": "long",
    "symbol": "BTC/USDT",
    "size": "250",
    "stopLoss": "20000",
    "takeProfit": "25000"
}
```

如果您的策略包含动态交易规模算法，您可以使用保证金倍数（此例中的交易规模为375美元）

```
{
    "direction": "long",
    "symbol": "BTC/USDT",
    "size": "250",
    "margin": "1.5",
    "stopLoss": "20000",
    "takeProfit": "25000"
}
```

用5%的自由资本（市价）做空交易，止损位于2%，并设有3个止盈点

1. 第一个TP在最终止盈点的33%（规模33%）
2. 第二个TP在最终止盈点的66%（规模33%）
3. 最终止盈水平在5%

```
{
    "direction": "short",
    "symbol": "BTC/USDT",
    "size": "5%",
    "stopLoss": "2%",
    "takeProfit": "5%",
    "takeProfitLevels": [
      {
        "price": "33%",
        "size": "33%"
      },
      {
        "price": "66%",
        "size": "33%"
      }
    ]
}
```

平仓做多或做空交易（市价全额平仓），同时关闭当前符号中的所有未结订单（止损 + 止盈）

```
{
    "direction": "close",
    "symbol": "BTC/USDT",
    "size": "100%"
}
```

平仓50%的做多或做空交易（限价订单 = 价格）。
{{close}} 是 Tradingview 警报中用于从 Tradingview 策略获取收盘价的占位符

```
{
  "direction": "close",
  "symbol": "BTC/USDT",
  "size": "50%",
  "price": "{{close}}"
}
```
