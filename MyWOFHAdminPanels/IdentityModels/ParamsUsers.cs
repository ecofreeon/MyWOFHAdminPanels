using System.ComponentModel.DataAnnotations;

namespace MyWOFHAdminPanels.IdentityModels
{
    public class ParamsUsers
    {
        [Required]
        public string login { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string password { get; set; }
    }
}
