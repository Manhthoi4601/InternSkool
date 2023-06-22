using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using IdentityCustom.Areas.Identity.Data;
using IdentityCustom.Models;
using IdentityCustom.Constants;
using Microsoft.AspNetCore.Authorization;
using IdentityCustom.Services;

namespace IdentityCustom.Controllers
{
    [Authorize(Roles = "Admin")]
    public class DeTaiController : Controller
    {
        private readonly IDeTaiRepository _deTaiRepository;
        private readonly ILogger<DeTaiController> _logger;
        public DeTaiController(IDeTaiRepository deTaiRepository, ILogger<DeTaiController> logger)
        {
            _deTaiRepository = deTaiRepository;
            _logger = logger;
        }

        public IActionResult Index()
        {
              return View();
        }

        [HttpGet]
        public IActionResult GetList()
        {
            var dt = _deTaiRepository.GetAll();
            return Json(dt);
        }

        //GetById
        [HttpGet]
        public IActionResult GetDetails(string id)
        {
            var data = _deTaiRepository.GetById(id);
            return Json(data);
        }
        [HttpPost]
        public IActionResult Create(DeTai obj)
        {
            if (ModelState.IsValid)
            {
                _deTaiRepository.Create(obj);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Update(DeTai obj)
        {
            if (ModelState.IsValid)
            {
                _deTaiRepository.Update(obj);
                return Ok();
            }
            return BadRequest();
        }


        [HttpPost]
        public IActionResult Delete(string id)
        {
            _deTaiRepository.Delete(id);
            return Json(new { success = true });
        }

    }
}
