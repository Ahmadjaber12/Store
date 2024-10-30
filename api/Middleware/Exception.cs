using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Middleware
{
    public class ExceptionMiddleware
    {   
        private readonly RequestDelegate _middleware;
        private readonly IHostEnvironment _environment;

        private readonly ILogger<ExceptionMiddleware> _logger;
        public ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware>logger,IHostEnvironment environment )
        {
            _environment = environment;
            _middleware=next;

            _logger=logger;
        }
        public  async Task InvokeAsync(HttpContext context){
            try{
                await _middleware(context);
            }
            catch(Exception e){
                _logger.LogError(e,e.Message);
                context.Response.StatusCode = 500;
                context.Response.ContentType = "application/json";
                var response = new ProblemDetails{
                    Status=500,
                    Detail= _environment.IsDevelopment() ? e.StackTrace?.ToString() : null,
                    Title=e.Message,
                };
                var options=new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};
                var json=JsonSerializer.Serialize(response,options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}