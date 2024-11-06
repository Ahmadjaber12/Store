using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dto;
using api.Enitites;

namespace api.DTO
{
    public class UserDto
    {
        public string Email { get; set; }

        public string Token { get; set;}

        public BasketDto basket { get; set; }


    }
}