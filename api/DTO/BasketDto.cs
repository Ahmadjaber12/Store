using api.DTO;
using api.Enitites;

namespace api.Dto{

    public class BasketDto{

        public int Id {set; get;}

        public string BuyerId{set; get;}

        public List<BasketItemDto> items{set; get;} 

        public string PaymentIntentId{set; get;}    

        public string ClientSecret { get; set; }


    }
}