using CryptoDashboardApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace CryptoDashboardApi.Rest_Api
{
    public class Products : IProducts
    {
        private readonly IHttpClientFactory _clientFactory;

        public Products(IHttpClientFactory httpClientFactory)
        {
            _clientFactory = httpClientFactory;
        }

        public async Task<DetailProduct> GetDetailProduct(string productId)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"/products/{productId}/ticker");
            var clientFactory = _clientFactory.CreateClient("products");
            HttpResponseMessage httpResponseMessage = await clientFactory.SendAsync(request);
            if (httpResponseMessage.StatusCode == HttpStatusCode.OK)
            {
                using var responseStream = await httpResponseMessage.Content.ReadAsStreamAsync();
                var data = await JsonSerializer.DeserializeAsync<DetailProduct>(responseStream);
                var result = await Task.FromResult<DetailProduct>(data);
                result.id = productId;

                return result;
            }
            else
            {
                throw new ApplicationException("No connection to server");
            }
        }        

        public async Task<Stats> GetStats(string productId)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"/products/{productId}/stats");
            var clientFactory = _clientFactory.CreateClient("products");
            HttpResponseMessage httpResponseMessage = await clientFactory.SendAsync(request);
            if (httpResponseMessage.StatusCode == HttpStatusCode.OK)
            {
                using var responseStream = await httpResponseMessage.Content.ReadAsStreamAsync();
                var data = await JsonSerializer.DeserializeAsync<Stats>(responseStream);
                
                return await Task.FromResult<Stats>(data);                                
            }
            else
            {
                throw new ApplicationException("No connection to server");
            }
        }
    }
}
