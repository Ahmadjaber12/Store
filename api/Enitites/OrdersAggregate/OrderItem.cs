using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Enitites.OrdersAggregate
{
    public class OrderItem
    {
        public int Id { get; set; }

        public ProductItemOrdered ItemOrdered{ get; set; }

        public long Price { get; set; }

        public int Quentity { get; set; }
    }
}