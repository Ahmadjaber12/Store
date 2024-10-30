
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Enitites
{
     [Table("BasketItems")]
    public class BasketItem 

    {       
            public int id{set; get;}

            public int Quentity {set; get;}

            public Product Product{get; set;}

            public int ProductId {get; set;} 

            public Basket basket {set; get;}

            public int BasketId {set; get;}   
    }
}