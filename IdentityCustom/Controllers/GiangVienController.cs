using IdentityCustom.Constants;
using IdentityCustom.Models;
using IdentityCustom.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityCustom.Controllers
{
    [Authorize(Roles = "Admin")]
    public class GiangVienController : Controller
    {

        private readonly IGiangVienRepository _giangVienRepository;
        public GiangVienController(IGiangVienRepository giangVienRepository)
        {
            _giangVienRepository = giangVienRepository;
        }
        public IActionResult Index()    
        {
            return View();
        }
        [HttpGet]
        public IActionResult GetList()
        {
            var dt = _giangVienRepository.GetAll();
            return Json(dt);
        }

        //GetById
        [HttpGet]
        public IActionResult GetDetails(long id)
        {
            var data = _giangVienRepository.GetById(id);
            return Json(data);
        }
        [HttpPost]
        public IActionResult Create(GiangVien obj)
        {
            if (ModelState.IsValid)
            {
                _giangVienRepository.Create(obj);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Update(GiangVien obj)
        {
            if (ModelState.IsValid)
            {
                _giangVienRepository.Update(obj);
                return Ok();
            }
            return BadRequest();
        }


        [HttpPost]
        public IActionResult Delete(long id)
        {
            _giangVienRepository.Delete(id);
            return Json(new { success = true });
        }
    }

}
