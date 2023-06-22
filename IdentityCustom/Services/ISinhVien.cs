using IdentityCustom.Areas.Identity.Data;
using IdentityCustom.Models;
using Microsoft.EntityFrameworkCore;

namespace IdentityCustom.Services
{
    public interface ISinhVienRepository
    {
        IEnumerable<SinhVien> GetAll();
        SinhVien GetById(long id);
        void Create(SinhVien sv);
        void Update(SinhVien sv);
        void Delete(long id);
    }

    public class SinhVienRepository  : ISinhVienRepository
    {
        private readonly ApplicationDbContext _context;
        public SinhVienRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<SinhVien> GetAll()
        {
            return _context.TBLSinhVien.Include(m => m.Khoa).ToList();
        }

        public SinhVien GetById(long id)
        {
            return _context.TBLSinhVien.Include(m => m.Khoa).FirstOrDefault(m => m.masv == id);
        }

        public void Create(SinhVien sv)
        {
            _context.TBLSinhVien.Add(sv);
            _context.SaveChanges();
        }

        public void Update(SinhVien sv)
        {
            _context.Entry(sv).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(long id)
        {
            var sv = _context.TBLSinhVien.Find(id);
            _context.TBLSinhVien.Remove(sv);
            _context.SaveChanges();
        }
       
    }
}
