import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/';
import Footer from '../../components/Footer';
import { AuthContext } from '../../contexts/AuthContext.js';

import Dashboard from './pages/Dashboard/';
import SchoolClass from './pages/SchoolClass/';
import Course from './pages/Course/';
import Schedule from './pages/Schedule/';
import Subject from './pages/Subject/';
import Student from './pages/Student/';
import Teacher from './pages/Teacher/';
import Event from './pages/Event/';
import Contract from './pages/Contract/';
import Profile from './pages/Profile/';


class School extends Component {
	render() {
		if(this.context.role !== 'school') {
			window.history.back();
			window.sessionStorage.setItem('status' , 'Akses Dilarang!');
			return (<React.Fragment></React.Fragment>);
		} else {
			return(
				<React.Fragment>
					<Sidebar />
					<div className="bg-gray-200 h-screen w-3/4 fixed right-0 z-0 pt-16 px-6 overflow-auto pb-6">
						<Switch>
							<Route path="/school/dashboard" component={Dashboard} />
							<Route path="/school/class" component={SchoolClass} />
							<Route path="/school/course" component={Course} />
							<Route path="/school/schedule" component={Schedule} />
							<Route path="/school/subject" component={Subject} />
							<Route path="/school/student" component={Student} />
							<Route path="/school/teacher" component={Teacher} />
							<Route path="/school/event" component={Event} />
							<Route path="/school/contract" component={Contract} />
							<Route path="/school/profile" component={Profile} />
						</Switch>
						<Footer  />
					</div>
				</React.Fragment>
			);
		}
	}
}


School.contextType = AuthContext;
export default School;
	