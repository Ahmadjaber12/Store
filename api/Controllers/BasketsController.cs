// using api.Data;
// using api.Dto;
// using api.DTO;
// using api.Enitites;
// using Microsoft.AspNetCore.Cors;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using SQLitePCL;

// namespace api.Controllers
// {   [EnableCors]
//     [ApiController]
//     [Route("[controller]")]
//     public class BasketsController : ControllerBase
//     {
//         private readonly StoreContext _context;


//         public BasketsController(StoreContext context)
//         {
//             _context =context;
//         }
//         [HttpGet(Name ="GetBasket")]
//         public async Task<ActionResult<BasketDto>> GetBascket()
//         {
//             var Basket = await RetreiveBasket();

//             if (Basket == null)
//                 return Ok("we didn't find the basket");
//             return MapBasketToDto(Basket);
//         }

//        [Route("Hello")]
//         public IActionResult getb(){
//             return Ok("Hello Man");
//         }

//         [HttpDelete]
//         [EnableCors]
//         public async Task<ActionResult> RemoveItemBasket(int productId,int quentity)
//         {
//             var Basket =await RetreiveBasket();
//             if (Basket == null) return NotFound("No Basket");

//             Basket.RemoveItem(productId, quentity);

//            var res=await _context.SaveChangesAsync() > 0;

//             return  res ? Ok("Successful") :BadRequest("there was a problem while deleting");
//         }
//         [HttpDelete]
//         [EnableCors]
//         [Route("RemoveBaskets")]
//         public  ActionResult RemoveBaskets()
//         {  
//             foreach(var row in _context.Baskets)
//                  _context.Baskets.Remove(row);


//                  _context.SaveChanges();
//                 return Ok();
//         }
//         [HttpPost]
//         public async Task<ActionResult> AddItemToBascket(int productId, int quentity)
//         {
//             var Basket= await RetreiveBasket();
//             if (Basket == null)
//             {
//                Basket= CreateBasket();
//             }
//             var Product=await _context.Products.FindAsync(productId);

//             if (Product == null) 
//             return BadRequest(new ProblemDetails{Title="Product not found"});

//             Basket.AddItem(quentity,Product);

//             var res= await _context.SaveChangesAsync() > 0; // SaveChangesAsync returns number of changes on DB if it is 0 no update.

//             return (res) ? CreatedAtRoute("GetBasket",MapBasketToDto(Basket)) : BadRequest();
            
//                     }
//         private async Task<Basket> RetreiveBasket(){
            
//            var buyerId = Request.Cookies["buyerId"];

//             if (string.IsNullOrEmpty(buyerId))
//                 {
//                     return null; // or you can throw an appropriate exception
//                 }

//                 return await _context.Baskets.Include(i => i.Items)
//                 .ThenInclude(x=> x.Product).
//                 FirstOrDefaultAsync(item=> item.BuyerId==buyerId);
//         }

//         private  Basket CreateBasket(){
//             var buyerId=Guid.NewGuid().ToString();
//             var CookieOpt=new CookieOptions {IsEssential = true,Expires=DateTime.Now.AddDays(30),SameSite = SameSiteMode.None,Secure=true};
//             Response.Cookies.Append("buyerId",buyerId, CookieOpt);
//             var Basket = new Basket{BuyerId= buyerId};
//             _context.Baskets.Add(Basket);
//             _context.SaveChanges();
//             return Basket;
//         }
//          private  BasketDto MapBasketToDto(Basket Basket)
//         {
//             return new BasketDto

//             {
//                 Id = Basket.id,
//                 BuyerId = Basket.BuyerId,
//                 items = Basket.Items.Select(x => new BasketItemDto
//                 {

//                     ProductId = x.ProductId,
//                     Name = x.Product.Name,
//                     PictureUrl = x.Product.PictureUrl,
//                     Price = x.Product.Price,
//                     Type = x.Product.Type,
//                     Brand = x.Product.Brand,
//                     Quentity = x.Quentity


//                 }).ToList()
//             };}
//     }
// }