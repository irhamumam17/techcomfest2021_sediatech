import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter , Route , Switch} from 'react-router-dom';
import Home from './components/Home/';
import Auth from './components/Auth/';
import Dashboard from './components/Dashboard/';
import Exercises from './components/Exercises/';


function App() {
  return (

    <React.Fragment>
            <BrowserRouter>
              <div className="content">
                <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/home" component={Home} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/admin" component={Dashboard} />
                        <Route path="/recruiter" component={Dashboard} />
                        <Route path="/school" component={Dashboard} />
                        <Route path="/teacher" component={Dashboard} />
                        <Route path="/student" component={Dashboard} />
                        <Route path="/exercises" component={Exercises} />
                </Switch>
            </div>
            </BrowserRouter>
    </React.Fragment>

  );
}



export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
