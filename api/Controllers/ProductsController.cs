using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Enitites;
using Microsoft.AspNetCore.Mvc;
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
        public ActionResult<List<Product>> GetProducts()
        {
            var products=storeContext.Products.ToList();
            return Ok(products);
        }
        [HttpGet("{id}")]
        [Route("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product=storeContext.Products.Find(id);
            return Ok(product);
        }

    }
}