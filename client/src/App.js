import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Articles from "./pages/Articles";

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Articles} />
    </div>
  </Router>
);

export default App;

// import React from "react";----------------------
// import Books from "./pages/Books";
// import Nav from "./components/Nav";

// const App = () => (
//   <div>
//     <Nav />
//     <Books />
//   </div>
// );

// export default App;
