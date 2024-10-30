using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Enitites;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Extentions
{
    public static class ProductsExtentions
    {
        public static IQueryable<Product>Sort (this IQueryable<Product> query, string orderBy){

            if (string.IsNullOrEmpty(orderBy))  return query.OrderBy(p=>p.Name);

            query=orderBy switch{
                "Price" => query.OrderBy(p=> p.Price),
                "priceDesc" => query.OrderByDescending(p=> p.Price),
                _ => query.OrderBy(p=> p.Name),
            };
            return query;
        }

        public static IQueryable<Product> findProduct (this IQueryable<Product> query, string search){
            if (string.IsNullOrEmpty(search)) return query;

            var productName=search.Trim().ToLower();

            return query.Where(p=>p.Name.ToLower().Contains(productName));
        }
        public static IQueryable<Product> filterBrandOrType (this IQueryable<Product> query, string brands,string types){
            var brandList=new  List<string>();
            var typeList=new  List<string>();

            if (!string.IsNullOrEmpty(brands) ) 
                brandList.AddRange(brands.ToLower().Split(',').ToList());

            if (!string.IsNullOrEmpty(types) ) 
                typeList.AddRange(types.ToLower().Split(',').ToList());

            var products= query.Where(p=>brandList.Count==0 || brandList.Contains(p.Brand.ToLower()));
                products= products.Where(p=> typeList.Count==0 || typeList.Contains(p.Type.ToLower()));
            return products;
        }
    }
}