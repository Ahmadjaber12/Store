using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dto;
using api.DTO;
using api.Enitites;
using api.Extentions;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _context;

        private readonly StoreContext cntxt;
        private readonly TokenServices token;

        public AccountController(UserManager<User> userManager,TokenServices token,StoreContext context)
        {
            this.token = token;
            _context = userManager;
            cntxt = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> Login([FromBody]loginDto loginDto){
            
            var User=await _context.FindByNameAsync(loginDto.UserName);

            if (User == null || !await _context.CheckPasswordAsync(User,loginDto.Password))

                return Unauthorized();  

            var userBasket = await RetreiveBasket(loginDto.UserName);

            var anon= await RetreiveBasket(Request.Cookies["buyerId"]);

            if(anon != null)
            {   
                if(userBasket != null) cntxt.Baskets.Remove(userBasket);
                anon.BuyerId = User.UserName;  // transfer the data in the basket to the real user logged in
                Response.Cookies.Delete("buyerId"); 
                await cntxt.SaveChangesAsync();

            }

             return new UserDto{
                Email=User.Email,
                Token=await token.GetToken(User),
                basket=anon!=null ? anon.Basketdto(): userBasket?.Basketdto()
                };
            }

        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody]RegisterDto registerDto)
        {

            var User = new User{UserName = registerDto.UserName,Email=registerDto.Email};

            var result= await _context.CreateAsync(User,registerDto.Password);

            if (!result.Succeeded){
                foreach(var Error in result.Errors){
                    ModelState.AddModelError(Error.Code, Error.Description);
                }

                return ValidationProblem();
            }
            await _context.AddToRoleAsync(User,"Member");
            return StatusCode(201);
        }
        
        [HttpGet("CurrentUser")]
        [Authorize]
        public async Task<ActionResult<UserDto>> getCurrentUser()
        {   
            var user=await _context.FindByNameAsync(User.Identity.Name);
            
            var userBasket = await RetreiveBasket(User.Identity.Name);

            return new UserDto{
                Email=user.Email,
                Token=await token.GetToken(user),
                basket=userBasket?.Basketdto()
            };
        }
        [Authorize]
        [HttpGet("savedAddress")]
        public async Task<ActionResult<UserAddress>> GetUserAddress(){
            return await _context.Users.Where(x=>x.UserName==User.Identity.Name)
            .Select(user=>user.userAddress)
            .FirstOrDefaultAsync();
        }

        private async Task<Basket> RetreiveBasket(string buyerId){
            

            if (string.IsNullOrEmpty(buyerId))
                {
                    Response.Cookies.Delete("buyerId");
                    return null;
                }

                return await cntxt.Baskets.Include(i => i.Items)
                .ThenInclude(x=> x.Product).
                FirstOrDefaultAsync(item=> item.BuyerId==buyerId);
        }



    }
}