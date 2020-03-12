import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin } from "react-google-login";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const onSuccess = googleUser => {
    console.log(googleUser);
    const idToken = googleUser.getAuthResponse().id_token;
    console.log({ idToken });
  };

  return (
    <div>
      <GoogleLogin
        clientId="426105557942-n9rn9d24h2vs7la4i66so4su9th9v6oh.apps.googleusercontent.com"
        onSuccess={onSuccess}
        isSignedIn={true}
      />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
