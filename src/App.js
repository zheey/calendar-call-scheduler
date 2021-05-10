import "./stylesheets/main.scss";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Dashboard}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
