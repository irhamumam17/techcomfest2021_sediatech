import React , {Component} from 'react';
import { Route , Switch } from 'react-router-dom';
import '../../styles/dashboard.css';
import AuthContextProvider from './contexts/AuthContext.js';
import MenuContextProvider from './contexts/MenuContext.js';
import CheckContext from './components/CheckContext/';
import Navbar from './components/Navbar/';
import Admin from './pages/Admin/';
import Recruiter from './pages/Recruiter/';
import School from './pages/School/';
import Teacher from './pages/Teacher/';
import Student from './pages/Student/';


class Dashboard extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="dashboard bg-gray-200 w-screen h-screen">
					<AuthContextProvider props={this.props} state={this.props.location.state}>
						<MenuContextProvider props={this.props} state={this.props.location.state} >
							<CheckContext />
							<Navbar />
							<Switch>
								<Route path="/admin" component={Admin} />
								<Route path="/recruiter" component={Recruiter} />
								<Route path="/school" component={School} />
								<Route path="/teacher" component={Teacher} />
								<Route path="/student" component={Student} />
							</Switch>
						</MenuContextProvider>
					</AuthContextProvider>
				</div>
			</React.Fragment>
		);
	}
}

export default Dashboard;
	