import { useState, useContext } from "react";
import { TextField, MenuItem, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserProvider.jsx";
import useGetUser from "../hooks/useGetUser.js";

const SignIn = () => {
  const accounts = ["Creator", "Authorizer", "Admin"];
  const [password, setPassword] = useState("");
  const [account_type, setAccount_type] = useState("Authorizer");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const { fetchUser, isFetchingUser } = useGetUser(setUser);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedUser = await fetchUser(username, password);
      console.log("Fetched user: ", fetchedUser);
      if (fetchedUser) {
        setUser(fetchedUser); // Set the user context with fetched user data
        navigate("/home");
      } else {
        console.error("Invalid username or password");
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error: ", err);
      setError("Login error. Please try again later.");
    }
  };

  return (
    <div className="form-container sign-in-container">
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        {/* <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
        <span>or use your account</span>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="signin_username"
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
          id="signin_password"
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
          disabled={isFetchingUser}
        >
          {isFetchingUser ? "Please wait..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
