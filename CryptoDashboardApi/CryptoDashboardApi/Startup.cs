using System;
using CryptoDashboardApi.Data;
using CryptoDashboardApi.Models;
using CryptoDashboardApi.Queue;
using CryptoDashboardApi.Rest_Api;
using CryptoDashboardApi.SignalR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace CryptoDashboardApi
{
    public class Startup
    {        
        public IConfiguration Configuration { get; }        

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {            
            services.AddCors(options =>
                {
                    options.AddDefaultPolicy(
                        builder =>
                        {
                            builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials(); 
                        });                    
                });
            services.AddControllers();
            services.AddSignalR();            
            ConfigureSwagger(services);
            var connectionSection = Configuration.GetSection("ConnectionStrings");
            services.Configure<ConnectionStrings>(connectionSection);
            services.AddSingleton<ICurrencyRepo, CurrencyRepo>();
            services.AddSingleton<IConnectToRabbitMQ, ConnectToRabbitMQ>();
            services.AddSingleton<IProducts, Products>();
            services.AddSingleton<IUserRepo, UserRepo>();
            services.AddSingleton<IMessagesRepo, MessagesRepo>();
            services.AddSingleton<MessageHub>();

            services.AddHttpClient("products", c =>
                {
                    //c.BaseAddress = new Uri("https://api-public.sandbox.pro.coinbase.com");
                    c.BaseAddress = new Uri("https://api.pro.coinbase.com");
                    c.DefaultRequestHeaders.Add("User-Agent", ".NET Framework Test Client");
                    c.DefaultRequestHeaders.Add("Accept", "application/json");
                });            
        }

        private static void ConfigureSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Crypto Dashboard", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors();
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }            
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(url: "/swagger/v1/swagger.json", name: "Crypto Dashboard V1");
            });

            app.UseRouting();

            //app.UseSignalR(routes =>
            //{
            //    routes.MapHub<MessageHub>("/messageHub");
            //});

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<MessageHub>("/messageHub");
            });
        }
    }
}
