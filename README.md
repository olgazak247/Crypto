# Dashboard to display realtime cryptocurrencies-fiat pairs
This dashboard displays the trends of cryptocurrency-fiat pairs based on Coinbase Pro stream data enhaced with charts, gauges and sparklines. 

<p>&nbsp;</p>

## Implementation
Implemented with .NET Core websocket service receving data stream from Coinbase Pro and storing it into RabbitMQ. Then another .NET Core Restful WebApi service subscribes to RabbitMQ to get data and pushes it to frontend using SignalR. As UI a React/Redux based web frontend displaying realtime data with charts, gauges and sparklines.

<p>&nbsp;</p>

## UI
![Dashboard main tooltip - original](https://user-images.githubusercontent.com/60622051/92509687-8dbc3680-f202-11ea-9d62-f85ac5fbc1ac.png)

<p>&nbsp;</p>

## Architecture
![Diagram](https://user-images.githubusercontent.com/60622051/92497071-cf43e600-f1f0-11ea-8f02-227a65a31308.jpg)

<p>&nbsp;</p>

## Endpoints
![Crypto Dashboard Swagger end points](https://user-images.githubusercontent.com/60622051/92510222-6b76e880-f203-11ea-8353-327f3caf73d2.png)
