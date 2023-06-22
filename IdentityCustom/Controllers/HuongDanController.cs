using IdentityCustom.Models;
using IdentityCustom.Services;
using Microsoft.AspNetCore.Mvc;

namespace IdentityCustom.Controllers
{
    public class HuongDanController : Controller
    {
        private readonly IHuongDanRepository _huongDanRepository;
        public HuongDanController(IHuongDanRepository HuongDanRepository)
        {
            _huongDanRepository = HuongDanRepository;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetList()
        {
            var dt = _huongDanRepository.GetAll();
            return Json(dt);
        }

        //GetById
        [HttpGet]
        public IActionResult GetDetails(long id)
        {
            var data = _huongDanRepository.GetById(id);
            return Json(data);
        }
        [HttpPost]
        public IActionResult Create(HuongDan obj)
        {
            if (ModelState.IsValid)
            {
                _huongDanRepository.Create(obj);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Update(HuongDan obj)
        {
            if (ModelState.IsValid)
            {
                _huongDanRepository.Update(obj);
                return Ok();
            }
            return BadRequest();
        }


        [HttpPost]
        public IActionResult Delete(long id)
        {
            _huongDanRepository.Delete(id);
            return Json(new { success = true });
        }
    }
}
