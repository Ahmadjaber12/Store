using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Enitites.OrdersAggregate
{
    public class Order
    {
        public int Id { get; set; }

        public string BuyerId { get; set; }
        [Required]
        public Shipping  Shipping { get; set; }

        public DateTime dateTime{ get; set; } = DateTime.Now;

        public List<OrderItem> Items { get; set; }

        public long SubTotal { get; set; }

        public long DeliveryFree { get; set; }

        public OrderStatus orderStatus{ get; set; }=OrderStatus.Pending;

        public long GetTotal (){
            
            return SubTotal + DeliveryFree;
        }
    }
}