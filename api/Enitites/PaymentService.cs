using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Stripe;

namespace api.Enitites
{
    public class PaymentService
    {
        private readonly IConfiguration _config;

        

        public PaymentService(IConfiguration configuration)
        {
            _config=configuration;
        }
        public async Task< PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket){
            StripeConfiguration.ApiKey = _config["StripeSettings:Secret_Key"];
            var service= new PaymentIntentService();
            var intent =new PaymentIntent();
            var SubTotal=basket.Items.Sum(x => x.Quentity * x.Product.Price);
            var DeliveryFree= SubTotal > 10000 ? 0 :500;
            if(string.IsNullOrEmpty(basket.PaymentIntentId)){
                var options=new PaymentIntentCreateOptions{
                    Amount=SubTotal+DeliveryFree,
                    Currency="usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent=await service.CreateAsync(options);
               
            }
            else{
                var options=new PaymentIntentUpdateOptions{
                    Amount=SubTotal +DeliveryFree,

                };
                await service.UpdateAsync(basket.PaymentIntentId,options);
            }
            return intent;
        }

       
    }
}