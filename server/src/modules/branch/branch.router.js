const express = require("express");
const {
  createBranch,
  updateBranch,
  getAllBranchAuthorizerAdmin,
    validateBranchController,
  getAllBranchCreator
} = require("./branch.controller");
const checkValidity = require("../../middleware/checkValidity");
const authenticateToken = require("../../middleware/authenticateToken");
const checkUserAccountType = require("../../middleware/checkUserAccountType");
const validateBranch = require("../../middleware/validateBranch");

const router = express.Router();

let allowedAccountTypes = ["Admin", "Creator"];
router.post(
  "/create",
  authenticateToken,
  checkUserAccountType(allowedAccountTypes),
  createBranch
);

allowedAccountTypes = ["Admin", "Authorizer"];
router.patch(
  "/:id/validate",
  authenticateToken, // Extract token and identify user
  validateBranch(allowedAccountTypes), // Validate the branch only if user is verfied to do so
  validateBranchController
);

allowedAccountTypes = ["Admin", "Creator"];
router.patch(
  "/:id/update",
  authenticateToken, // Extract token and identify user
  checkValidity(allowedAccountTypes), // check if user is allowed to modify the branch
  updateBranch
);

allowedAccountTypes = ["Admin", "Authorizer"];
router.get(
  "/all_auth_ad",
  authenticateToken,
  checkUserAccountType(allowedAccountTypes),
  getAllBranchAuthorizerAdmin
);

allowedAccountTypes = ["Creator"];
router.get(
  "/all_creator",
  authenticateToken,
  checkUserAccountType(allowedAccountTypes),
  getAllBranchCreator
);

module.exports = router;
