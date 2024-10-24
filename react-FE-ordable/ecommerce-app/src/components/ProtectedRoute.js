import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Loader } from "semantic-ui-react";
const ProtectedRoute = ({ children, setAuthToken, authorized }) => {
  console.log(`🚀 ~ ProtectedRoute ~ authorized:`, authorized);
  useEffect(() => {
    setAuthToken();
  }, []);

  if (!authorized) {
    return <Loader active>Loading...</Loader>;
  }

  return authorized ? children : <Navigate to="/login" />;
};
const mapStateToProps = (state) => ({
  authorized: state.auth.authorized,
});
const mapDispatchToProps = (dispatch) => ({
  setAuthToken: () => dispatch(actions.setAuthToken()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
