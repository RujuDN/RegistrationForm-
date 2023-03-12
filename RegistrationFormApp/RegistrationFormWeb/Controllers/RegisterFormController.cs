using RegistrationFormWeb.Models;
using RegistrationFormWeb.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RegistrationFormWeb.Controllers
{
    public class RegisterFormController : Controller
    {
        RegisterDAL registerDAL=new RegisterDAL();
        public ActionResult Index()
        {
            return View();
        }
       
        [HttpGet]
        public ActionResult GetAllDetails()
        {
            List<RegistrationFormModel> allDetails = registerDAL.GetAllDetails();
            return Json(allDetails,JsonRequestBehavior.AllowGet);
        }
        
        [HttpGet]
        public ActionResult GetAllState()
        {
            List<StateModel> stateList = registerDAL.GetAllStates();
            return Json(stateList, JsonRequestBehavior.AllowGet);
        }
       
        [HttpGet]
        public ActionResult GetAllCities(int stateId)
        {
            List<CityModel> cityList = registerDAL.GetAllCities(stateId);
            return Json(cityList, JsonRequestBehavior.AllowGet);
        }
       
        [HttpDelete]
        public ActionResult DeleteDetail(int id)
        {
            bool deleted = registerDAL.Deletedetail(id);
            return Json(deleted, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAllDetailById(int id)
        {
            RegistrationFormInsertModel detailById = registerDAL.GetDetailsbyId(id);
            return Json(detailById, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertUpdateDetails(RegistrationFormInsertModel obj)
        {
            bool isInserted = registerDAL.InsertUpdateDetails(obj);
            return Json(isInserted, JsonRequestBehavior.AllowGet);
        }
    }

}