const validateBranch = (allowedRoles) => {    
    return (req, res, next) => {
        const user = req.user; // Assuming user is attached to req (e.g., by a previous auth )

        if (!user || !allowedRoles.includes(user.role)) {
            return res
            .status(403)
            .json({
                message:
                "Access denied. You do not have permission to validate branches.",
            });
        }
        next();
    }
};

module.exports = validateBranch;
