using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO;
using api.Enitites.OrdersAggregate;
using Microsoft.EntityFrameworkCore;

namespace api.Extentions
{
    public static class orderExtenstions
    {
            public static IQueryable<orderrsTransfer> OrdertoOrderDto(this IQueryable<Order> order){
                    return order.Select(x => new orderrsTransfer{
                            Id = x.Id,
                            BuyerId=x.BuyerId,
                            dateTime=x.dateTime,
                            Shipping=x.Shipping,
                            DeliveryFree=x.DeliveryFree,
                            SubTotal=x.SubTotal,
                            orderStatus=x.orderStatus.ToString(),
                            Total=x.GetTotal(),
                            Items=x.Items.Select(item => new OrderItemDto{
                                ProductId=item.ItemOrdered.ProductId,
                                Name=item.ItemOrdered.Name,
                                PictureUrl=item.ItemOrdered.PictureURL,
                                Price=item.Price,
                                Quentity=item.Quentity,

                            }).ToList()
                    }).AsNoTracking();
            }
    }
}