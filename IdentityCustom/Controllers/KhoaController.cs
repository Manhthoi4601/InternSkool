using IdentityCustom.Constants;
using IdentityCustom.Models;
using IdentityCustom.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IdentityCustom.Controllers
{
    [Authorize(Roles = "Admin")]
    public class KhoaController : Controller
    {
        private readonly IKhoaRepository _khoaRepository;
        private readonly ILogger<KhoaController> _logger;
        public KhoaController(IKhoaRepository khoaRepository , ILogger<KhoaController> logger)
        {
            _khoaRepository = khoaRepository;
            _logger = logger;
        }
     
        public IActionResult Index()
        {
            return View();
        }

        //GetList
        [HttpGet]
        public IActionResult GetList()
        {
            var khoa = _khoaRepository.GetAll();
            return Json(khoa);
        }

        //GetById
        [HttpGet]
        public IActionResult GetDetails(string id)
        {
            var khoa = _khoaRepository.GetById(id);
            return Json(khoa);
        }

        [HttpPost]
        public IActionResult Create(Khoa khoa)
        {
            if (ModelState.IsValid)
            {
                 _khoaRepository.Create(khoa);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Update(Khoa khoa)
        {
            if (ModelState.IsValid)
            {
                _khoaRepository.Update(khoa);
                return Ok();
            }
            return BadRequest();
        }


        [HttpPost]
        public IActionResult Delete(string id)
        {
            _khoaRepository.Delete(id);
            return Json(new { success = true });
        }
    }
}
