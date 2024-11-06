using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enitites.OrdersAggregate;

namespace api.DTO
{
    public class CreateOrderdto
    {
        public bool SaveAddress { get; set; }

        public Shipping shipping{ get; set; }

    }
}