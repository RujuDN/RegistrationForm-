using RegistrationFormWeb.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;

namespace RegistrationFormWeb.Service
{
    public class RegisterDAL
    {
        SqlConnection connection=new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
        SqlCommand cmd;
        SqlDataAdapter sda;
        DataTable dt;

        public List<RegistrationFormModel> GetAllDetails()
        {
            cmd= new SqlCommand("usp_GetAllDetails", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            sda.Fill(dt);
            List<RegistrationFormModel> list = new List<RegistrationFormModel>();
            foreach (DataRow dr in dt.Rows)
            {
                list.Add(new RegistrationFormModel
                {
                    Id = Convert.ToInt32(dr["Id"]),
                    Name = dr["Name"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["email"].ToString(),
                    Phone = dr["Phone"].ToString(),
                    StateName = dr["StateName"].ToString(),
                    CityName = dr["CityName"].ToString() 
                });
            }
            return list;
        }

        public RegistrationFormInsertModel GetDetailsbyId(int id)
        {
            cmd = new SqlCommand("usp_GetDetailbyId", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Id", id);
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            sda.Fill(dt);
            RegistrationFormInsertModel list = new RegistrationFormInsertModel();
            foreach (DataRow dr in dt.Rows)
            {
                list.Id = Convert.ToInt32(dr["Id"]);
                list.Name = dr["Name"].ToString();
                list.Address = dr["Address"].ToString();
                list.Email = dr["email"].ToString();
                list.Phone = dr["Phone"].ToString();
                list.StateId = Convert.ToInt32(dr["StateId"]);
                list.CityId = Convert.ToInt32(dr["CityId"]);
            };
            return list;
        }

        public bool Deletedetail(int id)
        {
            cmd = new SqlCommand("usp_DeleteDetail", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Id", id);
            connection.Open();
            int isDeleted = cmd.ExecuteNonQuery();
            if (isDeleted > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool InsertUpdateDetails(RegistrationFormInsertModel model)
        {
            cmd = new SqlCommand("usp_InsertUpdateDetail", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Id", model.Id);
            cmd.Parameters.AddWithValue("@Name",model.Name);
            cmd.Parameters.AddWithValue("@Email",model.Email);
            cmd.Parameters.AddWithValue("@Phone", model.Phone);
            cmd.Parameters.AddWithValue("@Address",model.Address);
            cmd.Parameters.AddWithValue("@StateId", model.StateId);
            cmd.Parameters.AddWithValue("@CityId", model.CityId);
            connection.Open();
            int r=cmd.ExecuteNonQuery();
            if (r > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<StateModel> GetAllStates()
        {
            cmd = new SqlCommand("usp_GetAllState", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            sda.Fill(dt);
            List<StateModel> stateList = new List<StateModel>();
            foreach (DataRow dr in dt.Rows)
            {
                stateList.Add(new StateModel
                {
                    Id = Convert.ToInt32(dr["Id"]),
                    StateName = dr["StateName"].ToString()
                });
            }

            return stateList;
        }

        public List<CityModel> GetAllCities(int stateId)
        {
            cmd = new SqlCommand("usp_GetAllCity", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StateId", stateId);
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            sda.Fill(dt);
            List<CityModel> cityList = new List<CityModel>();
            foreach (DataRow dr in dt.Rows)
            {
                cityList.Add(new CityModel
                {
                    Id = Convert.ToInt32(dr["Id"]),
                    CityName = dr["CityName"].ToString(),
                    StateId = Convert.ToInt32(dr["StateId"])
                });
            }
            return cityList;
        }
    }
}