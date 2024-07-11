import { Container, Grid, Typography } from "@mui/material";
import CollaborationSVG from "../assets/real_time_collaboration.svg"; // Adjust the path accordingly
import "../utils/LandingPage.css";
import NavBar from "../components/NavBar";

const LandingPage = () => {
    return (
    //     <div className="background-cover">
            
    //   </div>
      <div>
        <NavBar />
        {/* <> */}
          {/* className="root" */}
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              {/* className="svgContainer" */}
              <img
                src={CollaborationSVG}
                alt="Real-time Collaboration"
                className="svgImage"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" className="heading">
                Real-time Collaboration
              </Typography>
              <Typography variant="h6" className="subheading">
                Work together seamlessly, no matter where you are. Our platform
                allows you to collaborate in real-time, making teamwork easier and
                more efficient.
              </Typography>
              <Typography variant="body1" className="bodyText">
                With features like live editing, instant updates, and seamless
                integration, you will be able to boost productivity and streamline
                your workflow. Join us today and experience the future of
                collaboration.
              </Typography>
            </Grid>
          </Grid>
        {/* </> */}
      </div>
    );
};

export default LandingPage;
