using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MyWOFHAdminPanels.Controllers
{
    [Authorize]
    public class AdviserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Test()
        {
            try
            {
                return Json(true);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}
