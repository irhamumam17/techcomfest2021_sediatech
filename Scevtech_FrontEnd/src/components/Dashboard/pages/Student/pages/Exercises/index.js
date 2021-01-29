import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';

import Tryout from './pages/Tryout/';
import Exam from './pages/Exam/';

class Exercises extends Component {
	render() {
		return(
			<React.Fragment>
				<Switch>
					<Route path="/student/exercises/tryout" component={Tryout} />
					<Route path="/student/exercises/exam" component={Exam} />
				</Switch>
			</React.Fragment>
		);
	}
}

export default Exercises;
	