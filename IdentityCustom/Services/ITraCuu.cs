using IdentityCustom.Areas.Identity.Data;
using IdentityCustom.Models;
using Microsoft.EntityFrameworkCore;

namespace IdentityCustom.Services
{
    public interface ITraCuuRepository
    {
        IEnumerable<SinhVien> GetAllSV();
        IEnumerable<HuongDan> GetDiem();

    }
    public class TraCuuRepository : ITraCuuRepository
    {
        private readonly ApplicationDbContext _context;
        public TraCuuRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<SinhVien> GetAllSV()
        {
            return _context.TBLSinhVien.Include(m => m.Khoa).ToList();
        }
        public IEnumerable<HuongDan> GetDiem()
        {
            return _context.TBLHuongDan.Include(m => m.SinhVien).ThenInclude(m => m.Khoa).Include(m => m.DeTai).Include(m => m.GiangVien).ToList();
        }
    }
}
