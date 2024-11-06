using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class RegisterDto :loginDto
    {
        public string Email { get; set; }
    }
}