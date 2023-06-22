using IdentityCustom.Models;
using IdentityCustom.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityCustom.Controllers
{
    [Authorize(Roles = "Admin")]
    public class SinhVienController : Controller
    {
        private readonly ISinhVienRepository _sinhVienRepository;
        public SinhVienController(ISinhVienRepository sinhVienRepository)
        {
            _sinhVienRepository = sinhVienRepository;
        }
        // GET: SinhVien

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult GetList()
        {
            var dt = _sinhVienRepository.GetAll();
            return Json(dt);
        }

        //GetById
        [HttpGet]
        public IActionResult GetDetails(long id)
        {
            var data = _sinhVienRepository.GetById(id);
            return Json(data);
        }
        [HttpPost]
        public IActionResult Create(SinhVien obj)
        {
            if (ModelState.IsValid)
            {
                _sinhVienRepository.Create(obj);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Update(SinhVien obj)
        {
            if (ModelState.IsValid)
            {
                _sinhVienRepository.Update(obj);
                return Ok();
            }
            return BadRequest();
        }


        [HttpPost]
        public IActionResult Delete(long id)
        {
            _sinhVienRepository.Delete(id);
            return Json(new { success = true });
        }
    }
}
