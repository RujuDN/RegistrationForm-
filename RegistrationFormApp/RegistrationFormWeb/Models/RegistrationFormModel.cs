using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RegistrationFormWeb.Models
{
    public class RegistrationFormModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string StateName { get; set; }
        public string CityName { get; set; }

    }
    public class RegistrationFormInsertModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int StateId { get; set; }
        public int CityId { get; set; }
    }

    public class StateModel
    {
        public int Id { get; set; }
        public string StateName { get; set; }
    }

    public class CityModel
    {
        public int Id { get; set; }
        public int StateId { get; set; }
        public string CityName { get; set; }
    }
}