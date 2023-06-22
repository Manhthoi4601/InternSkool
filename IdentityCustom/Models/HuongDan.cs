using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IdentityCustom.Models
{
    [Table("TBLHuongDan")]
    public class HuongDan
    {
        //ma
        [Key]
        [Display(Name = "Mã Hướng Dẫn")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long mahd { get; set; }

        [ForeignKey("SinhVien")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long masv { get; set; }
        public virtual SinhVien SinhVien { get; set; }

        //madt
        [ForeignKey("DeTai")]
        [StringLength(10)]
        [Required]
        public string madt { get; set; }
        public virtual DeTai DeTai { get; set; }

        //magv
        [ForeignKey("GiangVien")]
        [Display(Name = "Họ Tên GV")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long magv { get; set; }
        public virtual GiangVien GiangVien { get; set; }

        //Ketqua
        [Display(Name = "Kết Quả")]
        [Column(TypeName = "decimal(5, 2)")]
        public decimal? ketqua { get; set; }

    }
}
