using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Enitites.OrdersAggregate
{       
    [Owned]

    public class ProductItemOrdered
    {  
        public int ProductId { get; set; }  

        public string Name {get; set;}

        public string PictureURL {get; set;} 
    }
}