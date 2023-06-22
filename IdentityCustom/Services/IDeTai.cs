using IdentityCustom.Areas.Identity.Data;
using IdentityCustom.Models;
using Microsoft.EntityFrameworkCore;

namespace IdentityCustom.Services
{
    public interface IDeTaiRepository
    {
        IEnumerable<DeTai> GetAll();
        DeTai GetById(string id);
        void Create(DeTai dt);
        void Update(DeTai dt);
        void Delete(string id);
    }

    public class DeTaiRepository : IDeTaiRepository
    {
        private readonly ApplicationDbContext _context;
        public DeTaiRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<DeTai> GetAll()
        {
            return _context.Set<DeTai>().ToList();
        }

        public DeTai GetById(string id)
        {
            return _context.Set<DeTai>().Find(id);
        }

        public void Create(DeTai dt)
        {
            _context.Set<DeTai>().Add(dt);
            _context.SaveChanges();
        }

        public void Update(DeTai dt)
        {
            _context.Entry(dt).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(string id)
        {
            var dt = _context.Set<DeTai>().Find(id);
            _context.Set<DeTai>().Remove(dt);
            _context.SaveChanges();
        }
    }
}
