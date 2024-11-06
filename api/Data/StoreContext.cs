using api.Enitites;
using api.Enitites.OrdersAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class StoreContext : IdentityDbContext<User,Role,int>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<Product> Products { get; set;} 

        public DbSet<Basket> Baskets { get; set;} 

        public DbSet<Order>  orders   {get; set; }

        protected override void OnModelCreating(ModelBuilder builder){

            base.OnModelCreating(builder);

            builder.Entity<User>().HasOne(u => u.userAddress)
            .WithOne().HasForeignKey<UserAddress>(a=>a.Id)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>().HasData(
                new Role{Id=1,Name="Member",NormalizedName="MEMBER"},
                new Role{Id=2,Name="Admin",NormalizedName="ADMIN"});
        }

    }
}