import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/';
import Footer from '../../components/Footer/';

import { AuthContext } from '../../contexts/AuthContext.js';
import Dashboard from './pages/Dashboard/';
import Subject from './pages/Subject/';
import Theory from './pages/Theory/';
import Duty from './pages/Duty/';
import Exercises from './pages/Exercises/';
import Absent from './pages/Absent/';
import Announcement from './pages/Announcement/';
import Store from './pages/Store/';
import Profile from './pages/Profile/';
import Library from './pages/Library/';
import Payment from './pages/Payment/';
import Event from './pages/Event/';


class Student extends Component {
	render() {
		if(this.context.role !== 'student') {
			window.history.back();
			window.sessionStorage.setItem('status' , 'Akses Dilarang!');
			return (<React.Fragment></React.Fragment>);
		} else {
			return(
				<React.Fragment>
					<Sidebar />
					<div className="bg-gray-200 h-screen w-3/4 fixed right-0 z-0 pt-16 px-6 overflow-auto pb-6">
						<Switch>
							<Route path="/student/dashboard" component={Dashboard} />
							<Route path="/student/subject" component={Subject} />
							<Route path="/student/theory" component={Theory} />
							<Route path="/student/duty" component={Duty} />
							<Route path="/student/exercises" component={Exercises} />
							<Route path="/student/absent" component={Absent} />
							<Route path="/student/announce" component={Announcement} />
							<Route path="/student/store" component={Store} />
							<Route path="/student/profile" component={Profile} />
							<Route path="/student/library" component={Library} />
							<Route path="/student/payment" component={Payment} />
							<Route path="/student/event" component={Event} />
						</Switch>
						<Footer />
					</div>
				</React.Fragment>
			);
		}
	}
}


Student.contextType = AuthContext;
export default Student;
	