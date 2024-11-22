using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dto;
using api.Enitites;
using api.Enitites.OrdersAggregate;
using api.Extentions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Stripe;

namespace api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentService _paymentService;
        private readonly StoreContext _storeContext;

        public IConfiguration Config { get; }

        public PaymentController(PaymentService paymentService,StoreContext storeContext,IConfiguration config)
        {
            this.Config = config;
             _storeContext=storeContext;
             _paymentService=paymentService;
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult <BasketDto>> CreateOrUpdatePaymentsIntent()
        {
            var basket=await _storeContext.Baskets.BasketAndItems(User.Identity.Name).FirstOrDefaultAsync();
            if (basket==null) return NotFound();

            var intent=await _paymentService.CreateOrUpdatePaymentIntent(basket);

            if (intent==null)   return BadRequest(new ProblemDetails{Title="Problem creating Payment Intent"});

             basket.PaymentIntentId= basket.PaymentIntentId ?? intent.Id;
             basket.ClientSecret= basket.ClientSecret ?? intent.ClientSecret;
            _storeContext.Update(basket);
            var res=await _storeContext.SaveChangesAsync() > 0;

            if(!res) return BadRequest(new ProblemDetails{Title="Problem with Updating Payment Intent"});

            return Ok(basket.Basketdto());
        }
        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebHook(){

            var json=await new StreamReader(Request.Body).ReadToEndAsync();
            var StripeEvent=EventUtility.ConstructEvent(json,Request.Headers["Stripe-Signature"],
                Config["StripeSettings:WhSecret"]);

            var charge=(Charge)StripeEvent.Data.Object;
            var order=await _storeContext.orders.FirstOrDefaultAsync(o=>o.PaymentIntentId==charge.PaymentIntentId);  
            if (order==null) return BadRequest("there is no order");
            if(charge.Status == "succeeded")
            {
                order.OrderStatus=OrderStatus.PaymentRecieved;
            }
            await _storeContext.SaveChangesAsync();
            return new EmptyResult();
        }

        
    }
}