using System.Net;
using api.Data;
using api.Dto;
using api.DTO;
using api.Enitites;
using api.Extentions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace api.Controllers
{   [EnableCors]
    [ApiController]
    [Route("[controller]")]
    public class BasketsController : ControllerBase
    {
        private readonly StoreContext _context;


        public BasketsController(StoreContext context)
        {
            _context =context;
        }
        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBascket()
        {
            var Basket = await RetreiveBasket(getBuyerId());

            if (Basket == null)
                return Ok("we didn't find the basket");
            return BasketExtention.Basketdto(Basket);
        }

       [Route("Hello")]
        public IActionResult getb(){
            return Ok("Hello Man");
        }

        [HttpDelete]
        [EnableCors]
        public async Task<ActionResult> RemoveItemBasket(int productId,int quentity)
        {
            var Basket =await RetreiveBasket(getBuyerId());
            if (Basket == null) return NotFound("No Basket");

            Basket.RemoveItem(productId, quentity);

           var res=await _context.SaveChangesAsync() > 0;

            return  res ? Ok("Successful") :BadRequest("there was a problem while deleting");
        }
        [HttpDelete]
        [EnableCors]
        [Route("RemoveBaskets")]
        public  ActionResult RemoveBaskets()
        {  
            foreach(var row in _context.Baskets)
                 _context.Baskets.Remove(row);
                 _context.SaveChanges();
                return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> AddItemToBascket([FromQuery]int productId,[FromQuery] int quentity)
        {
            var Basket= await RetreiveBasket(getBuyerId());
            if (Basket == null)
            {
               Basket= CreateBasket();
            }
            var Product=await _context.Products.FindAsync(productId);

            if (Product == null) 
            return BadRequest(new ProblemDetails{Title="Product not found"});

            Basket.AddItem(quentity,Product);

            var res= await _context.SaveChangesAsync() > 0; // SaveChangesAsync returns number of changes on DB if it is 0 no update.

            return (res) ? CreatedAtRoute("GetBasket",BasketExtention.Basketdto(Basket)) : BadRequest();
            
                    }
        private async Task<Basket> RetreiveBasket(string buyerId){
            

            if (string.IsNullOrEmpty(buyerId))
                {
                    Response.Cookies.Delete("buyerId");
                    return null;
                }

                return await _context.Baskets.Include(i => i.Items)
                .ThenInclude(x=> x.Product).
                FirstOrDefaultAsync(item=> item.BuyerId==buyerId);
        }

        private string getBuyerId(){
            return User.Identity.Name ?? Request.Cookies["buyerId"];
        }

        private  Basket CreateBasket(){

            var buyerId=User.Identity.Name;

            if(string.IsNullOrEmpty(buyerId)){
                
                 buyerId=Guid.NewGuid().ToString();
                 var CookieOpt=new CookieOptions {IsEssential = true,Expires=DateTime.Now.AddDays(30),SameSite = SameSiteMode.None,Secure=true};
                 Response.Cookies.Append("buyerId",buyerId, CookieOpt);

            }
            
            var Basket = new Basket{BuyerId= buyerId};
            _context.Baskets.Add(Basket);
            _context.SaveChanges();
            return Basket;
        }
        
    }
}