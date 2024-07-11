const BranchModel = require("../../model/Branch.model");
const authenticateToken = require("../../middleware/authenticateToken");

const createBranch = async (req, res) => {
  const {
    branch_name,
    branch_area,
    address,
    owner_name,
    owner_percentage_share_deposit,
    old_deposit,
    deposit_amenities,
    additional_normal,
    total_deposit,
    owner_percentage_share_rent,
    rent_amenities,
    normal,
    total_rent,
    escalation_clause,
    rent_payment_for_entire_lease,
    current_rent,
    zone,
    nodal_officer,
    agreement_execution_date,
  } = req.body;

  console.log(req.body);

  const deposit = {
    old_deposit: old_deposit,
    amenities: deposit_amenities,
    additional_normal: additional_normal,
    total_deposit: total_deposit,
  };
  const start_rent = {
    amenities: rent_amenities,
    normal: normal,
    total_rent: total_rent,
  };
  try {
    const validated = false;
    const created_by = req.user._id;
    const branch = await BranchModel.create({
      branch_name: branch_name,
      branch_area: branch_area,
      address: address,
      owner_name: owner_name,
      owner_percentage_share_deposit: owner_percentage_share_deposit,
      deposit: deposit,
      owner_percentage_share_rent: owner_percentage_share_rent,
      start_rent: start_rent,
      escalation_clause: escalation_clause,
      rent_payment_for_entire_lease: rent_payment_for_entire_lease,
      current_rent: current_rent,
      zone: zone,
      nodal_officer: nodal_officer,
      agreement_execution_date: agreement_execution_date,
      validated: validated,
      created_by: created_by
    });
    // const createdBranch = Branch.crea;
    res
      .status(201)
      .json({ branch: branch, message: "Branch created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// const updateBranch = async (req, res) => {
//   const {
//     branch_name,
//     branch_area,
//     address,
//     owner_name,
//     owner_percentage_share_deposit,
//     old_deposit,
//     deposit_amenities,
//     additional_normal,
//     total_deposit,
//     owner_percentage_share_rent,
//     rent_amenities,
//     normal,
//     total_rent,
//     escalation_clause,
//     rent_payment_for_entire_lease,
//     current_rent,
//     zone,
//     nodal_officer,
//     agreement_execution_date,
//   } = req.body;

//   try {
//     const branch = await BranchModel.findOne({
//       branch_name: req.body.branch_name,
//     });
//     console.log(branch);

//     if (!branch) {
//       res
//         .status(404)
//         .json({ message: "Invalid branch name or no branch found" });
//     }

//     branch.branch_name = branch_name || branch.branch_name;
//     branch.branch_area = branch_area || branch.branch_area;
//     branch.address = address || branch.address;
//     branch.owner_name = owner_name || branch.owner_name;
//     branch.owner_percentage_share_deposit = owner_percentage_share_deposit || branch.owner_percentage_share_deposit;
//     branch.old_deposit = old_deposit || branch.old_deposit;
//     branch.deposit_amenities = deposit_amenities || branch.deposit_amenities;
//     branch.additional_normal = additional_normal || branch.additional_normal;
//     branch.total_deposit = total_deposit || branch.total_deposit;
//     branch.owner_percentage_share_rent = owner_percentage_share_rent || branch.owner_percentage_share_rent;
//     branch.rent_amenities = rent_amenities || branch.rent_amenities;
//     branch.normal = normal || branch.normal;
//     branch.total_rent = total_rent || branch.total_rent;
//     branch.escalation_clause = escalation_clause || branch.escalation_clause;
//     branch.rent_payment_for_entire_lease = rent_payment_for_entire_lease || branch.rent_payment_for_entire_lease;
//     branch.current_rent = current_rent || branch.current_rent;
//     branch.zone = zone || branch.zone;
//     branch.nodal_officer = nodal_officer || branch.nodal_officer;
//     branch.agreement_execution_date = agreement_execution_date || branch.agreement_execution_date;

//     const updatedBranch = branch.save();
//     res.status(201).json({
//       message: "Branch updated successfully",
//       updatedBranch: updatedBranch,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: err.message });
//   }
// };

const updateBranch = async (req, res) => {
  try {
    const branchId = req.params.id;
    const updateData = req.body;
    console.log(branchId);

    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // If the branch is validated, check if the user is admin
    if (branch.validated && !allowedRoles.includes(req.user.account_type)) {
      return res.status(403).json({
        message: "Forbidden: Only admin can update a validated branch",
      });
    }

    // Update the branch with the provided data
    const updatedBranch = await Branch.findByIdAndUpdate(branchId, updateData, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Branch updated successfully", updatedBranch });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllBranchAuthorizerAdmin = async (req, res) => {
  try {
    const branches = await BranchModel.find();
    console.log(branches);

    if (branches.length === 0) {
      return res.status(404).json({ message: "No branches found" });
    }

    res.status(200).json(branches);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }

}

const getAllBranchCreator = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user

    // Fetch branches created by the user or validated by Authorizers
    const branches = await Branch.find({
      $or: [
        { created_by: userId }, // Assuming `createdBy` field in Branch schema to store the ID of the creator
        { validated: true },
      ],
    });

    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const validateBranchController = async (req, res) => {
  try {
    const branchId = req.params.id;
    const branch = await Branch.findById(branchId);

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // Update only the validated field
    await Branch.updateOne({ _id: branchId }, { $set: { validated: true } });

    res.status(200).json({ message: "Branch validated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createBranch,
  updateBranch,
  getAllBranchAuthorizerAdmin,
  validateBranchController,
  getAllBranchCreator,
};