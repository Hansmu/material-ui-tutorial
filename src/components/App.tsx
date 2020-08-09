import React from 'react';
import {ThemeProvider} from "@material-ui/styles";
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Header} from "./ui/Header";
import {theme} from "./ui/theme";

function App() {
  return (
      <ThemeProvider theme={theme}>
          <BrowserRouter>
              <Header />

              <Switch>
                  <Route exact path={'/'} component={() => <div>Home</div>} />
                  <Route exact path={'/services'} component={() => <div>Services</div>} />
                  <Route exact path={'/customsoftware'} component={() => <div>Custom software</div>} />
                  <Route exact path={'/mobileapps'} component={() => <div>Mobile apps</div>} />
                  <Route exact path={'/websites'} component={() => <div>Websites</div>} />
                  <Route exact path={'/revolution'} component={() => <div>Revolution</div>} />
                  <Route exact path={'/about'} component={() => <div>About</div>} />
                  <Route exact path={'/contact'} component={() => <div>Contact</div>} />
                  <Route exact path={'/estimate'} component={() => <div>Estimate</div>} />
              </Switch>
          </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
