using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{   [ApiController]
    [Route("Api/[controller]")]
    public class BuggyController: ControllerBase
    {  
         [HttpGet("NotFound")]
        public ActionResult GetNoFound()
        {
            return NotFound();
        }

         [HttpGet("UnAuthorized")]
        public ActionResult UnAuthorized()
        {
            return Unauthorized();
        }

         [HttpGet("Bad-Request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title="this is a bad request" });
        }

         [HttpGet("Validation-Error")]
        public ActionResult GetValidationError()
        {   ModelState.AddModelError("Problem1", "this is the first error"); 
            ModelState.AddModelError("Problem2", "this is the second error"); 

            return ValidationProblem();
        }
         [HttpGet("Server-Error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a Server Error");
        }
    }
}
