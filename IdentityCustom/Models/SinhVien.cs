using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IdentityCustom.Models
{
    [Table("TBLSinhVien")]
    public class SinhVien
    {
        [Key]
        [Display(Name = "Mã SV")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long masv { get; set; }

        //public virtual HuongDan HuongDan { get; set; }

        //hoten
        [StringLength(30)]
        [Required]
        [Display(Name = "Họ Tên SV")]
        public string hotensv { get; set; }

        //makhoa
        [ForeignKey("Khoa")]
        [StringLength(10)]
        public string makhoa { get; set; }
        public virtual Khoa Khoa { get; set; }

        //namsinh
        [Display(Name = "Ngày Sinh")]
        [DataType(DataType.Date)]
        public DateTime ngaysinh { get; set; }

        //quequan
        [Display(Name = "Quê Quán")]
        [StringLength(30)]
        public string? quequan { get; set; }
    }
}
