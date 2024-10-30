using Microsoft.AspNetCore.Http.HttpResults;

namespace api.Enitites
{
       public class Basket {

            public int id {set; get;}

            public string BuyerId {set; get;}

            public List<BasketItem> Items {get; set;}=new();
 
            public void AddItem(int Quentity,Product product){
                
                if(Items.All(item => item.ProductId != product.Id))//checking if the Product is exist or not in the basket if it is new to add a new quentity and a product
                    {   
                        Items.Add(new BasketItem{Product= product,Quentity= Quentity});
                    }

                var existingItem=Items.FirstOrDefault(item => item.ProductId==product.Id);
                if(existingItem!=null){
                    existingItem.Quentity +=Quentity;

                }
            }
            public void RemoveItem(int ProductId,int Quentity)
            {       var Item = Items.FirstOrDefault(item => item.ProductId==ProductId);
                    if(Item!=null )
                    Item.Quentity -=Quentity;
                    else return;
                    if(Item.Quentity<=0)
                    Items.Remove(Item); 
               
            }
            }


}
