using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace IdentityCustom.Models
{
    [Table("TBLKhoa")]
    public class Khoa
    {
        //Ma
        [Key]
        [StringLength(10)]
        [Display(Name = "Mã Khoa")]
        public string makhoa { get; set; }

        //Ten
        [StringLength(30)]
        [Required]
        [Display(Name = "Tên Khoa")]
        public string tenkhoa { get; set; }

        //DienThoai
        [StringLength(10)]
        [Required]
        [Display(Name = "Điện Thoại")]
        public string dienthoai { get; set; }
    }
}