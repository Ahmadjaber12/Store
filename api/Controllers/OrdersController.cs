using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using System.Collections.Generic;
using api.Enitites;
using api.Enitites.OrdersAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.DTO;
using api.Extentions;
using Microsoft.AspNetCore.Http.Features;

namespace api.Controllers
{   [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
       private readonly StoreContext _context;

        public OrdersController(StoreContext context)

        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<orderrsTransfer>>> GetOrders()
        {
            return await _context.orders.OrdertoOrderDto()
            .Where(x => x.BuyerId == User.Identity.Name).ToListAsync();

        }
        
        [HttpGet("{id}",Name="GetOrder")]
        public  async Task<ActionResult<orderrsTransfer>> GetOrder(int id)
        {
            return await _context.orders.OrdertoOrderDto()
            .Where(x => x.Id == id && x.BuyerId == User.Identity.Name).FirstOrDefaultAsync();

        }
        [HttpPost]
        
        public async Task<ActionResult> CreateOrder(CreateOrderdto orderdto){
            var basket = await _context.Baskets.BasketAndItems(User.Identity.Name).FirstOrDefaultAsync();
            if(basket == null){
                return BadRequest(new ProblemDetails { Title="Could not find the basket" });

            }
            var Orderitems=new List<OrderItem>();
            foreach(var item in basket.Items){
                var Product= await _context.Products.FirstOrDefaultAsync(x => x.Id==item.ProductId);
                var itemOrdered= new ProductItemOrdered{
                    ProductId=Product.Id,
                    PictureURL=Product.PictureUrl,
                    Name=Product.Name,
                };
                var itemOrder=new OrderItem{
                    ItemOrdered=itemOrdered,
                    Price=Product.Price,
                    Quentity=item.Quentity                    

                };
                Orderitems.Add(itemOrder);
                Product.QuantityInStock -= item.Quentity;
            }
            var SubTotal=Orderitems.Sum(x=>x.Quentity * x.Price);
            var DeliveryFree=SubTotal>1000 ? 0 :500;

            var order=new Order{
                Items=Orderitems,
                BuyerId=User.Identity.Name,
                Shipping=orderdto.shipping,
                SubTotal=SubTotal,
                DeliveryFree=DeliveryFree,
                PaymentIntentId=basket.PaymentIntentId
            };
            _context.orders.Add(order);
            _context.Baskets.Remove(basket);
            if(orderdto.SaveAddress)
{           var user =await _context.Users.Include(u=>u.userAddress).FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

            var address=new UserAddress{
                FullName=orderdto.shipping.FullName,
                Address1=orderdto.shipping.Address1,
                Address2=orderdto.shipping.Address2,    
                City=orderdto.shipping.City,
                State=orderdto.shipping.State,
                Zip=orderdto.shipping.Zip,
                Country=orderdto.shipping.Country,
            };
            user.userAddress=address;
}         
        var result=await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute("GetOrder", new {id=order.Id}, order.Id);
        return BadRequest("Problem creating the Order");
    }}
}