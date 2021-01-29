import React , {Component} from 'react';

import LandingContextProvider from '../../context/LandingContext.jsx';

// sections
import Banner from '../../sections/Banner/';
import About from '../../sections/About/';
import WhyUs from '../../sections/WhyUs/';
import Courses from '../../sections/Courses/';
import Job from '../../sections/Job/';
import Testimoni from '../../sections/Testimoni/';
import Partner from '../../sections/Partner/';
import Feature from '../../sections/Feature/';

class Landing extends Component {
	render() {
		return(
			<React.Fragment>
				<LandingContextProvider>
					<Banner />
					<About />
					<Feature />
					<WhyUs />
					<Courses />
					<Job />
					<Testimoni />
					<Partner />
				</LandingContextProvider>
			</React.Fragment>
		);
	}
}

export default Landing;
	