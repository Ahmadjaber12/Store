using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Helper;

namespace api.Extentions
{
    public static class HttpExtentions
    {
        public static void AddPaginationHeader(this HttpResponse response, MetData metData){
            var options=new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};
            response.Headers.Append("Pagination", JsonSerializer.Serialize(metData,options));

            response.Headers.Append("Access-Control-Expose-Headers","Pagination");
        }
    }
}