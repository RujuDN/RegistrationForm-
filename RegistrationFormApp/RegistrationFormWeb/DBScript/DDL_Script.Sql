----user registration table---------
CREATE TABLE tblUserRegistration ( 
					  Id INT NOT NULL IDENTITY(1,1),
                      Name VARCHAR(200) NOT NULL ,  
                      Email VARCHAR(200) NOT NULL ,  
                      Phone VARCHAR(100),
                      Address VARCHAR(MAX),
					  StateId INT NOT NULL,
					  CityId INT NOT NULL,
                      PRIMARY KEY (Id)
					  );
					  
---State table----				  
CREATE TABLE tblState (
   Id INT NOT NULL IDENTITY(1,1),
   StateName VARCHAR(200),
   PRIMARY KEY(Id)
);

---City table----					  
CREATE TABLE tblCity (
   Id INT NOT NULL IDENTITY(1,1),
   StateId INT NOT NULL FOREIGN KEY REFERENCES tblState(Id),
   CityName VARCHAR(200),
   PRIMARY KEY(Id)
);

ALTER TABLE tblUserRegistration
ADD FOREIGN KEY (StateId) REFERENCES tblState(Id);

ALTER TABLE tblUserRegistration
ADD FOREIGN KEY (CityId) REFERENCES tblCity(Id);

------ getalldetails---------
CREATE PROCEDURE usp_GetAllDetails 
AS
BEGIN
    SELECT tu.Id,[Name],Email,Phone,[Address],ts.StateName,tc.CityName FROM tblUserRegistration tu WITH(NOLOCK)
    INNER JOIN tblState ts ON tu.StateId=ts.Id
    INNER JOIN tblCity tc ON tu.CityId=tc.Id
END
GO
------ insert/update detail ---------
CREATE PROCEDURE usp_InsertUpdateDetail
   @Id INT,
   @Name VARCHAR(200),
   @Email VARCHAR(200),
   @Phone VARCHAR(100)=NULL,
   @Address VARCHAR(MAX) =NULL,
   @StateId INT,
   @CityId INT
AS
BEGIN
IF EXISTS(SELECT 1 FROM tblUserRegistration WITH (NOLOCK) WHERE Id=@Id)
   BEGIN
      UPDATE [tblUserRegistration] SET 
	  [Name] = @Name,Email=@Email,Phone=@Phone,[Address]=@Address,StateId=@StateId,CityId=@CityId 
	  WHERE Id=@Id
	  SELECT SCOPE_IDENTITY();
   END
   ELSE
   BEGIN
       INSERT INTO tblUserRegistration Values (@Name,@Email,@Phone,@Address,@StateId,@CityId);
	   SELECT SCOPE_IDENTITY();
   END
END
GO

-------delete detail--------
CREATE PROCEDURE usp_DeleteDetail
   @ID INT
AS
BEGIN
  BEGIN TRY
     IF EXISTS (SELECT 1 FROM tblUserRegistration WITH (NOLOCK) WHERE Id=@ID)
	 BEGIN
	     DELETE FROM tblUserRegistration WHERE Id=@ID;		 
		 SELECT 'True';
	 END
  END TRY
  BEGIN CATCH
     SELECT ERROR_MESSAGE()
  END CATCH
END					  
GO
-----------Get detail by Id------------------
CREATE PROCEDURE usp_GetDetailbyId
  @Id INT
AS
BEGIN  
    SELECT tu.Id,[Name],Email,Phone,[Address],tu.StateId,tu.CityId FROM tblUserRegistration tu WITH(NOLOCK)
    INNER JOIN tblState ts ON tu.StateId=ts.Id
    INNER JOIN tblCity tc ON tu.CityId=tc.Id
	WHERE tu.Id =@Id
END
GO
----------get all state-----------------
CREATE PROCEDURE usp_GetAllState
AS
BEGIN
  SELECT * FROM tblState WITH(NOLOCK);
END
Go
-------------get all city-------------------
CREATE PROCEDURE usp_GetAllCity
  @StateId INT
AS
BEGIN
  SELECT * FROM tblCity WITH(NOLOCK) WHERE StateId=@StateId;
END
GO