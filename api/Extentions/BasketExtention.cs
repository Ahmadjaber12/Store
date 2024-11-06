using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dto;
using api.DTO;
using api.Enitites;
using Microsoft.EntityFrameworkCore;

namespace api.Extentions
{
    public static class BasketExtention
    {
        public static BasketDto Basketdto(this Basket basket){

            return new BasketDto(){
                Id = basket.id,
                BuyerId = basket.BuyerId,
                items = basket.Items.Select(x => new BasketItemDto
                {

                    ProductId = x.ProductId,
                    Name = x.Product.Name,
                    PictureUrl = x.Product.PictureUrl,
                    Price = x.Product.Price,
                    Type = x.Product.Type,
                    Brand = x.Product.Brand,
                    Quentity = x.Quentity


                }).ToList()
            };
            }

        public static IQueryable< Basket> BasketAndItems(this IQueryable<Basket> basket,string buyerId){
            return basket.Include(b=>b.Items).ThenInclude(x=>x.Product).Where(x=>x.BuyerId==buyerId);
        }
        }
    }
