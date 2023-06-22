using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IdentityCustom.Models
{
    [Table("TBLGiangVien")]
    public class GiangVien
    {
        //Ma
        [Key]
        [Display(Name = "Mã GV")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long magv { get; set; }

        //Ten
        [StringLength(30)]
        [Required]
        [Display(Name = "Họ Tên GV")]
        public string? hotengv { get; set; }

        //luong
        //[DataType(DataType.Currency)]
        //[Display(Name = "Lương")]
        //[Column(TypeName = "decimal(5, 2)")]
        //public double luong { get; set; }

        //DienThoai
        [StringLength(10)]
        [Required]
        [Display(Name = "Điện Thoại")]
        public string dienthoai { get; set; }

        //Email
        [StringLength(255)]
        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email")]
        public string email { get; set; }


        //makhoa
        [ForeignKey("Khoa")]
        [StringLength(10)]
        [Required]
        public string makhoa { get; set; }
        public virtual Khoa Khoa { get; set; }
    }
}
