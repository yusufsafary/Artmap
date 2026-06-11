import { Route, Switch } from "wouter";
import LandingPage from "./pages/LandingPage";
import App from "./App";
import NotFound from "./pages/not-found";

export default function Router() {
  return (
    <Switch>
      <Route path="/" component={App} />
      <Route path="/landing" component={LandingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}