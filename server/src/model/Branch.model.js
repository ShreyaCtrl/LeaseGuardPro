const { Schema, model, Mongoose } = require("mongoose");

const BranchSchema = new Schema({
  branch_name: {
    type: String,
    required: true,
    unique: true,
  },
  branch_area: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  owner_name: {
    type: String,
    required: true,
  },
  owner_percentage_share_deposit: {
    type: Number,
    required: true,
  },
  deposit: {
    old_deposit: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Number,
      required: true,
    },
    additional_normal: {
      type: Number,
      required: true,
    },
    total_deposit: {
      type: Number,
      required: true,
    },
  },
  owner_percentage_share_rent: {
    type: Number,
    required: true,
  },
  start_rent: {
    amenities: {
      type: Number,
      required: true,
    },
    normal: {
      type: Number,
      required: true,
    },
    total_rent: {
      type: Number,
      required: true,
    },
  },
  escalation_clause: {
    type: String,
    required: true,
  },
  rent_payment_for_entire_lease: {
    type: Number,
    required: true,
  },
  current_rent: {
    type: Number,
    required: true,
  },
  zone: {
    type: Number,
    required: true,
  },
  nodal_officer: {
    type: String,
    required: true,
  },
  agreement_execution_date: {
    type: Date,
    required: true,
  },
  validated: {
    type: Boolean,
    required: true,
    default: false,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Branch = model("Branch", BranchSchema);
module.exports = Branch;