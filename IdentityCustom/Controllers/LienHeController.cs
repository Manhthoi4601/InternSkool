using IdentityCustom.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityCustom.Controllers
{
    [Authorize(Roles = "Admin, User")]
    public class LienHeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
