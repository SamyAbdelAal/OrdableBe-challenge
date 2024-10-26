import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Loader } from "semantic-ui-react";
const ProtectedRoute = ({ children, setAuthToken, authorized, is_admin }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setAuthToken(navigate);
  }, []);

  if (!authorized) {
    return <Loader active>Loading...</Loader>;
  }

  return authorized.is_admin ? (
    children
  ) : !authorized ? (
    <Navigate replace="/login" />
  ) : (
    <Navigate to="/" />
  );
};
const mapStateToProps = (state) => ({
  authorized: state.auth.authorized,
  is_admin: state.auth.is_admin,
});
const mapDispatchToProps = (dispatch) => ({
  setAuthToken: (navigate) => dispatch(actions.setAuthToken(navigate)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
