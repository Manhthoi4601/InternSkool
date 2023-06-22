using IdentityCustom.Constants;
using IdentityCustom.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityCustom.Controllers
{
    [Authorize(Roles = "Admin, User")]
    public class TraCuuController : Controller
    {
       

        private readonly ITraCuuRepository _traCuuRepository;
        public TraCuuController(ITraCuuRepository traCuuRepository)
        {
            _traCuuRepository = traCuuRepository;
        }
        public IActionResult TongQuan()
        {
            return View();
        }   
        public IActionResult DanhsachSinhVien()
        {
            return View();
        }
        public IActionResult SVLst()
        {
            var dt = _traCuuRepository.GetAllSV();
            return Json(dt);
        }
        public IActionResult ThongtindiemSV()
        {
            return View();
        }
        public IActionResult DiemLst()
        {
            var dt = _traCuuRepository.GetDiem();
            return Json(dt);
        }
    }
}
