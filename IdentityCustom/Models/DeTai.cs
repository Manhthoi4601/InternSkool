using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace IdentityCustom.Models
{
    [Table("TBLDeTai")]
    public class DeTai
    {

        [Key]
        [StringLength(10)]
        [Display(Name = "Mã Đề Tài")]
        public string madt { get; set; }

        //tendt
        [Required]
        [StringLength(30)]
        [Display(Name = "Tên Đề Tài")]
        public string tendt { get; set; }

        //kinhphi
        [Display(Name = "Kinh Phí")]
        public int kinhphi { get; set; }

        //NoiThucTap
        [Required]
        [StringLength(30)]
        [Display(Name = "Nơi Thực Tập")]
        public string NoiThucTap { get; set; }
    }
}
