import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/';
import Footer from '../../components/Footer/';
import RoleTeacherContextProvider from './context.js';
import { AuthContext } from '../../contexts/AuthContext.js';

import Dashboard from './pages/Dashboard/';
import ListClass from './pages/ListClass/';
import Subject from './pages/Subject/';
import Schedule from './pages/Schedule/';
import Theory from './pages/Theory/';
import Duty from './pages/Duty/';
import Exercises from './pages/Exercises/';
import Library from './pages/Library/';
import Student from './pages/Student/';
import Absent from './pages/Absent/';
import Payment from './pages/Payment/';
import Announcement from './pages/Announcement/';
import Profile from './pages/Profile/';

class Teacher extends Component {
	render() {
		if(this.context.role !== 'teacher') {
			window.history.back();
			window.sessionStorage.setItem('status' , 'Akses Dilarang!');
			return (<React.Fragment></React.Fragment>);
		} else {
			return(
				<React.Fragment>
					<RoleTeacherContextProvider>
						<Sidebar />
						<div className="bg-gray-200 h-screen w-3/4 fixed right-0 z-0 pt-16 px-6 overflow-auto pb-6">
							<Switch>
								<Route path="/teacher/dashboard" component={Dashboard} />
								<Route path="/teacher/class" component={ListClass} />
								<Route path="/teacher/subject" component={Subject} />
								<Route path="/teacher/schedule" component={Schedule} />
								<Route path="/teacher/theory" component={Theory} />
								<Route path="/teacher/duty" component={Duty} />
								<Route path="/teacher/exercises" component={Exercises} />
								<Route path="/teacher/absent" component={Absent} />
								<Route path="/teacher/payment" component={Payment} />
								<Route path="/teacher/library" component={Library} />
								<Route path="/teacher/student" component={Student} />
								<Route path="/teacher/announcement" component={Announcement} />
								<Route path="/teacher/profile" component={Profile} />
							</Switch>
							<Footer />
						</div>
					</RoleTeacherContextProvider>
				</React.Fragment>
			);
		}
	}
}



Teacher.contextType = AuthContext;
export default Teacher;
	