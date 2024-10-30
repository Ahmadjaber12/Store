using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Data;
using api.Enitites;
using api.Extentions;
using api.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{   [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext storeContext;

        public ProductsController(StoreContext storeContext)
        {
            this.storeContext = storeContext;
        }

        [HttpGet]
        [Route("filter")]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query= storeContext.Products.Sort(productParams.OrderBy).filterBrandOrType(productParams.Brands,productParams.Types).findProduct(productParams.SearchTerm).AsQueryable();

            var products=await PagedList<Product>.getPagedList(query,productParams.PageNumber,productParams.PageSize);

            Response.AddPaginationHeader(products.metData);

            
            return  products;
        }
        [HttpGet("{id}")]
        [Route("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product=await storeContext.Products.FindAsync(id);
            if(product==null)
            return NotFound();
            return Ok(product);
        }
        [HttpGet]
        [Route("findbyname")]
        public async Task<ActionResult<List<Product>>> GetProductbyname(string orderby,string searchTerm)
        {
            var query=storeContext.Products.Sort(orderby).findProduct(searchTerm).AsQueryable();

            
            return await query.ToListAsync();
        }
        [HttpGet("filters")]
        public async Task<IActionResult> Filters(){

            var Brands= await storeContext.Products.Select(p=>p.Brand).Distinct().ToListAsync();
            
            var Types= await storeContext.Products.Select(p=>p.Type).Distinct().ToListAsync();

                return Ok (new {Types, Brands});
        }
       
    }
}