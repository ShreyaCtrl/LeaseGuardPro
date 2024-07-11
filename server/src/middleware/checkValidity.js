const Branch = require("../model/Branch.model");

const checkValidity = (allowedRoles) => {
  return async (req, res, next) => {
    try {
        const branchId = req.params.id;
        const branch = await Branch.findById(branchId);
        console.log("Branch ID : ", branch);

      if (!branch) {
        return res.status(404).json({ message: "Branch not found" });
      }

      const userRole = req.user.account_type; // Assuming user role is stored in req.user

      if (branch.validated && !allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden: Only authorized roles can update a validated branch" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
};

module.exports = checkValidity;
