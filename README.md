# Dashboard to display realtime cryptocurrencies-fiat pairs
This dashboard displays the trends of cryptocurrency-fiat pairs based on Coinbase Pro stream data enhaced with charts, gauges and sparklines. 

## Implementation
Implemented with .NET Core websocket service receving data stream from Coinbase Pro and storing it into RabbitMQ. Then another .NET Core Restful WebApi service subscribes to RabbitMQ to get data and pushes it to frontend using SignalR. As UI a React/Redux based web frontend displaying realtime data with charts, gauges and sparklines.

## UI
![Crypto Dashboard - Full Stack](https://user-images.githubusercontent.com/60622051/92393198-6b99ba00-f117-11ea-9d68-ea56bd950636.png)

## Architecture
![Diagram](https://user-images.githubusercontent.com/60622051/92497071-cf43e600-f1f0-11ea-8f02-227a65a31308.jpg)
