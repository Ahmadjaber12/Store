using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Enitites
{
    public class User:IdentityUser<int>
    {
        public UserAddress userAddress{ get; set; }
    }
}