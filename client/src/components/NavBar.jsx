import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { UserContext } from "../UserProvider";

const NavBar = () => {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          InnovateSphere
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user ? (
                <>
                  {user.role === "Investor" || user.role === "Founder" ? (
                    <>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/profile"
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/create-post"
                      >
                        Create Post
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/posts"
                      >
                        Posts
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/home"
                      >
                        Home
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/posts"
                      >
                        Posts
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/home"
                      >
                        Home
                      </MenuItem>
                    </>
                  )}
                </>
              ) : (
                <>
                  <MenuItem onClick={handleClose} component={Link} to="/">
                    Login
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/signup">
                    Signup
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <>
            {user ? (
              <>
                {user.role === "Investor" || user.role === "Founder" ? (
                  <>
                    <Button color="inherit" component={Link} to="/profile">
                      Profile
                    </Button>
                    <Button color="inherit" component={Link} to="/create-post">
                      Create Post
                    </Button>
                    <Button color="inherit" component={Link} to="/posts">
                      Posts
                    </Button>
                    <Button color="inherit" component={Link} to="/home">
                      Home
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="inherit" component={Link} to="/posts">
                      Posts
                    </Button>
                    <Button color="inherit" component={Link} to="/home">
                      Home
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
