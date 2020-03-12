import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin } from "react-google-login";
import { GraphQLClient } from "graphql-request";
// import Typography from "@material-ui/core/Typography";

import Context from "../../context";

const ME_QUERY = `{
    me{
      _id
      email
      name
      picture
    }
  }`;

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);
  const onSuccess = async googleUser => {
    console.log(googleUser);
    const idToken = googleUser.getAuthResponse().id_token;
    console.log({ idToken });
    const client = new GraphQLClient("http://localhost:4000/graphql", {
      headers: { authorization: idToken }
    });
    const data = await client.request(ME_QUERY);
    console.log({ data });
    dispatch({ type: "LOGIN_USER", payload: data.me });
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
