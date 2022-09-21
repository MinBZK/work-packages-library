import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Users from "./Users";
import NewQr from "./NewQr";
import Qrs from "./Qrs";
import Login from "./Login";
import PolicyOrgNew from "./PolicyOrgNew";
import PolicySearch from "./PolicySearch";
import PoliciesIndex from "./PoliciesIndex";
import Entitlement from "./Entitlement";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";
import { Role } from "../types/user";
import ForgotPassword from "./ForgotPassword";
import { logger } from "../utils/logger";

function App() {
  logger.info("v 6.27.22");

  return (
    <Container
      className="d-flex align-items-start justify-content-center pt-4"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute
                onlyRoles={[Role.Admin, Role.Manager, Role.User]}
                exact
                path="/"
                component={Dashboard}
              />

              <PrivateRoute
                exact
                path="/new-qr"
                component={NewQr}
                onlyRoles={[Role.Manager, Role.User]}
              />

              <PrivateRoute
                exact
                path="/users"
                component={Users}
                onlyRoles={[Role.Admin]}
              />

              <PrivateRoute
                exact
                path="/billing"
                component={Qrs}
                onlyRoles={[Role.Admin]}
              />

              <Route exact path="/login" component={Login} />
              <Route exact path="/policies/new" component={PolicyOrgNew} />
              <Route exact path="/policies/search" component={PolicySearch} />
              <Route exact path="/policies" component={PoliciesIndex} />
              <Route path="/entitlement" component={Entitlement} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/*" component={NotFound} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
