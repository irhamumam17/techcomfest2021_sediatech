import React , {Component} from 'react';
import { Route , Switch} from 'react-router-dom';
import '../../styles/landing.css';
import Landing from './pages/Landing';
import Course from './pages/Course';
import Job from './pages/Job';

import Navbar from './components/Navbar/';
import Footer from './components/Footer/';

class Home extends Component {
	render() {
		return(
			<React.Fragment>
				<Navbar />
				<div className="bg-gray-100 text-gray-700">
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/home" component={Landing} />
						<Route path="/home/landing" component={Landing} />
						<Route path="/home/course" component={Course} />
						<Route path="/home/job" component={Job} /> 
					</Switch>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default Home;
