import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button } from "@mui/material";
import useAddUser from "../hooks/useAddUser";

const SignUp = () => {
  const accounts = ["Creator", "Authorizer", "Admin"];
  const [password, setPassword] = useState("");
  const [account_type, setAccount_type] = useState("Authorizer");
  const [error, setError] = useState(null);
  const { addUser, isAddingUser } = useAddUser();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  console.log(error);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors
    try {
      addUser({ username, password, account_type });
      navigate("/home");
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container sign-up-container">

      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        {/* <input
          type="text"
          name="username"
          value={state.name}
          onChange={handleChange}
          placeholder="username"
        /> */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          select
          label="Account Type"
          value={account_type}
          onChange={(e) => setAccount_type(e.target.value)}
        >
          {accounts.map((account) => (
            <MenuItem key={account} value={account}>
              {account}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isAddingUser}
        >
          {isAddingUser ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
