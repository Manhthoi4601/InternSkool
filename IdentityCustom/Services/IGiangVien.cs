using IdentityCustom.Areas.Identity.Data;
using IdentityCustom.Models;
using Microsoft.EntityFrameworkCore;

namespace IdentityCustom.Services
{
    public interface IGiangVienRepository
    {
        IEnumerable<GiangVien> GetAll();
        GiangVien GetById(long id);
        void Create(GiangVien obj);
        void Update(GiangVien obj);
        void Delete(long id);
    }

    public class GiangVienRepository : IGiangVienRepository
    {
        private readonly ApplicationDbContext _context;
        public GiangVienRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<GiangVien> GetAll()
        {
            return _context.TBLGiangVien.Include(m => m.Khoa).ToList();
        }

        public GiangVien GetById(long id)
        {
            return _context.TBLGiangVien.Include(m => m.Khoa).FirstOrDefault(m => m.magv == id);
        }

        public void Create(GiangVien obj)
        {
            _context.TBLGiangVien.Add(obj);
            _context.SaveChanges();
        }

        public void Update(GiangVien obj)
        {
            _context.Entry(obj).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(long id)
        {
            var obj = _context.TBLGiangVien.Find(id);
            _context.TBLGiangVien.Remove(obj);
            _context.SaveChanges();
        }

    }
}
