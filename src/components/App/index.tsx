import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Loading from "../Loading";
import Home from "../../pages/Home";

const App: React.FC = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
