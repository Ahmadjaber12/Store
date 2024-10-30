using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Helper
{
    public class PagedList<T> : List<T> 
    {   
        public PagedList(List<T> items,int count,int PageNumber,int pagesize) 
        {
            metData=new MetData{
                TotalPages=(int) Math.Ceiling(count/(double)pagesize),
                PageSize=pagesize,
                TotalPagesCount=count,
                CurrentPage =PageNumber
            };
            AddRange(items);
        }
                public MetData metData { get; set; }

                public static async Task<PagedList<T>> getPagedList(IQueryable<T> query,int PageNumber,int pagesize){

                    var count =await query.CountAsync();
                    var items = await query.Skip((PageNumber-1)* pagesize).Take(pagesize).ToListAsync();
                    return new PagedList<T>(items,count,PageNumber,pagesize);
                }
    }
}