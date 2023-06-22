using IdentityCustom.Areas.Identity.Data;
using IdentityCustom.Models;
using Microsoft.EntityFrameworkCore;

namespace IdentityCustom.Services
{
    public interface IHuongDanRepository
    {
        IEnumerable<HuongDan> GetAll();
        HuongDan GetById(long id);
        void Create(HuongDan obj);
        void Update(HuongDan obj);
        void Delete(long id);
    }

    public class HuongDanRepository : IHuongDanRepository
    {
        private readonly ApplicationDbContext _context;
        public HuongDanRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<HuongDan> GetAll()
        {
            return _context.TBLHuongDan.Include(m => m.SinhVien).ThenInclude(m => m.Khoa).Include(m => m.GiangVien).Include(m => m.DeTai).ToList();
        }

        public HuongDan GetById(long id)
        {
            return _context.TBLHuongDan.Include(m => m.SinhVien).ThenInclude(m => m.Khoa).Include(m => m.GiangVien).Include(m => m.DeTai).FirstOrDefault(m => m.mahd == id);
        }

        public void Create(HuongDan obj)
        {
            _context.TBLHuongDan.Add(obj);
            _context.SaveChanges();
        }

        public void Update(HuongDan obj)
        {
            _context.Entry(obj).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(long id)
        {
            var obj = _context.TBLHuongDan.Find(id);
            _context.TBLHuongDan.Remove(obj);
            _context.SaveChanges();
        }

    }
}
