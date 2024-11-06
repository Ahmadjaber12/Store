using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Enitites.OrdersAggregate;

namespace api.DTO
{
    public class orderrsTransfer
    {
        public int Id { get; set; }

        public string BuyerId { get; set; }
        [Required]
        public Shipping  Shipping { get; set; }

        public DateTime dateTime{ get; set; } = DateTime.Now;

        public List<OrderItemDto> Items { get; set; }

        public long SubTotal { get; set; }

        public long DeliveryFree { get; set; }

        public string orderStatus{ get; set; }

        public long Total { get; set; }
    }

   
}