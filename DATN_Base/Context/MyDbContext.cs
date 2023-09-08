using DATN_Base.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DATN_Base.Context
{
    public class MyDbContext : DbContext
    {
        public DbSet<Account> Account { get; set; }
        public DbSet<HangHoa> hangHoas { get; set; }
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }
    }
}

