exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.messAdminBoard = (req, res) => {
    res.status(200).send("Mess admin Content.");
  };
  exports.cleanAdminBoard = (req, res) => {
    res.status(200).send("Clean admin Content.");
  };