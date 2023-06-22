using IdentityCustom.Areas.Identity.Data;
using IdentityCustom.Models;
using Microsoft.EntityFrameworkCore;

namespace IdentityCustom.Services
{

    public interface IKhoaRepository
    {
        IEnumerable<Khoa> GetAll();
        Khoa GetById(string id);
        void Create(Khoa khoa);
        void Update(Khoa khoa);
        void Delete(string id);
    }

    public class KhoaRepository : IKhoaRepository
    {
        private readonly ApplicationDbContext _context;
        public KhoaRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Khoa> GetAll()
        {
            return _context.Set<Khoa>().ToList();
        }

        public Khoa GetById(string id)
        {
            return _context.Set<Khoa>().Find(id);
        }

        public void Create(Khoa khoa)
        {
            _context.Set<Khoa>().Add(khoa);
            _context.SaveChanges();
        }

        public void Update(Khoa khoa)
        {
            _context.Entry(khoa).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(string id)
        {
            var khoa = _context.Set<Khoa>().Find(id);
            _context.Set<Khoa>().Remove(khoa);
            _context.SaveChanges();
        }

    }
}
