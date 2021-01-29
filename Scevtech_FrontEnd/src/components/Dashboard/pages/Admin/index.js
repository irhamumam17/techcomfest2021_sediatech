import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/';
import Footer from '../../components/Footer/';
import { AuthContext } from '../../contexts/AuthContext.js';

import Dashboard from './pages/Dashboard/';
import AdminPage from './pages/Admin/';
import School from './pages/School/';
import Recruiter from './pages/Recruiter/';
import Course from './pages/Course/';
import Scholarship from './pages/Scholarship/';
import Payment from './pages/Payment/';
import Job from './pages/Job/';
import Setting from './pages/Setting/';
import Feedback from './pages/Feedback/';
import Profile from './pages/Profile/';

class Admin extends Component {
	render() {
		if(this.context.role !== 'admin') {
			window.history.back();
			window.sessionStorage.setItem('status' , 'Akses Dilarang!');
			return (<React.Fragment></React.Fragment>);
		} else {
			return(
				<React.Fragment>
					<Sidebar />
					<div className="bg-gray-200 h-screen w-3/4 fixed right-0 z-0 pt-16 px-6 overflow-auto pb-6">
						<Switch>
							<Route path="/admin/dashboard" component={Dashboard} />
							<Route path="/admin/admin" component={AdminPage} />
							<Route path="/admin/admin"><AdminPage props={this.props} /></Route>
							<Route path="/admin/school"><School props={this.props} /></Route>
							<Route path="/admin/recruiter" ><Recruiter props={this.props} /></Route>
							<Route path="/admin/course" component={Course} />
							<Route path="/admin/scholarship" component={Scholarship} />
							<Route path="/admin/payment" component={Payment} />
							<Route path="/admin/job" component={Job} />
							<Route path="/admin/setting" component={Setting} />
							<Route path="/admin/feedback" component={Feedback} />
							<Route path="/admin/profile" component={Profile} />
						</Switch>
						<Footer />
					</div>
				</React.Fragment>
			);
		}
	}
}

Admin.contextType = AuthContext;
export default Admin;
	