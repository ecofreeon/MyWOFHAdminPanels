using DataModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using MyWOFHAdminPanels.IdentityModels;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace MyWOFHAdminPanels.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class TestController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> Test()
        {
            return Json(new {Message = "Здарова"});
        }
    }
}
