import React , {Component} from 'react';
import axios from '../../../../axios.js';
import Loading from '../../../Dashboard/components/Loading/';
import Navbar from '../../component/Navbar/';
import Question from '../../component/Question/';
import ListNumber from '../../component/ListNumber/';

class Exam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exam: '',
			questions: [],
			loading: true,
			active: 0,
			results: [],
		}

		this.changeActive = this.changeActive.bind(this);
		this.appendResult = this.appendResult.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	} 

	componentDidMount() {
		let exam = this.props.location.exam;
		if(this.props.location.exam) {
			this.setState({ exam: exam.exam , questions: exam.questions , loading: false });
		} else {
			let examid = this.props.match.params.id;
			let user = JSON.parse(window.sessionStorage.getItem('data_user'));
			axios.get(`student/${user.id}/exam/do/${examid} `)
			.then(res => {
					this.setState({
						exam: res.data.exam,
						questions: res.data.questions,
						loading: false,
						active: 0,
					});
			}).catch(err => console.log(err));
		}
	}

	changeActive(number) {
		this.setState({ active: number-1 });
	}

	appendResult(question , answer) {
		let status = false;
		let results  =	this.state.results.map(result => {
				if(result.question === question) {
					status = true;
					return {
						question: question,
						answer: answer,
					}
				} else {
					return result;
				}
			})
		if(!status) {
			this.setState({ results: [...this.state.results , { question: question , answer: answer }] });
		} else {
			this.setState({ results: results });
		}
	}

	handleSubmit() {
		let user = JSON.parse(window.sessionStorage.getItem('data_user'));
		axios.post(`/student/${user.id}/exam/submit/${this.state.exam.id} ` , this.state.results)
			.then(res => {
				console.log(res);
			})
	}

	render() {
		return(
			<React.Fragment>
				<Navbar exam={this.state.exam} />
				<div className="pt-20 px-12 bg-gray-200 w-screen h-screen">
					<Loading status={this.state.loading} size="large"  />
					<div className="flex flex-row gap-4">
						<div className="w-3/4">
							<Question question={this.state.questions[this.state.active]} append={this.appendResult} />
						</div>
						<div className="w-1/4">
							<ListNumber change={this.changeActive} numbers={this.state.questions} submit={this.handleSubmit} />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}


export default Exam;
	