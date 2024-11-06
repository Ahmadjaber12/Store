using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using api.Enitites;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace api.Services
{
    public class TokenServices
    {
        public readonly UserManager<User> UserManager ;
        public readonly IConfiguration config;

        public TokenServices(UserManager<User> userManager,IConfiguration config)
        {
            this.config = config;
            UserManager = userManager;
        }

        public async Task<string> GetToken(User user){

            var claims=new List<Claim>{
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name,user.UserName)
            };
            var roles=await UserManager.GetRolesAsync(user);

            foreach(var role in roles){
                claims.Add(new Claim(ClaimTypes.Role,role));
            }
            var key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWTSettings:TokenKey"]));

            var creds=new SigningCredentials(key,SecurityAlgorithms.HmacSha512) ;

        var Tokenopt=new JwtSecurityToken(
            issuer:null,
            audience:null,
            signingCredentials:creds
            ,claims:claims,
            expires:DateTime.Now.AddDays(7));

            return new JwtSecurityTokenHandler().WriteToken(Tokenopt);

        }

    }
}