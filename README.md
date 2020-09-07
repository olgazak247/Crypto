# Crypto
Displaying a realtime FX multicurrency monitoring dashboard. This dashboard displays the trend of cryptocurrencies based on Conibase Pro data enhaced with charts, gauges and sparklines. A .NET Core websocket sevice receving data stream from Coinbase Pro and storing then into RAbbitMQ. A .NET Core Restful WebApi service subscribing to RabbitMQ to get data and pushing then to frontend using SignalR. And finally, a React/Redux based frontend displaying the realtime data with charts, gauges and sparklines.

![Crypto Dashboard - Full Stack](https://user-images.githubusercontent.com/60622051/92393198-6b99ba00-f117-11ea-9d68-ea56bd950636.png)
