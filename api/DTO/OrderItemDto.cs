using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class OrderItemDto
    {
        public int ProductId { get; set; }

        public string Name { get; set;}

        public string PictureUrl { get; set; }

        public long Price { get; set; }

        public int Quentity { get; set; }
        

    }
}