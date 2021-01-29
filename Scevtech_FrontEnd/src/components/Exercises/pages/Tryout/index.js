import React , {Component} from 'react';
import axios from '../../../../axios.js';
import Loading from '../../../Dashboard/components/Loading/';
import Navbar from '../../component/Navbar/';
import Question from '../../component/Question/';
import ListNumber from '../../component/ListNumber/';
import Result from '../../component/Result/';
import Timeout from '../../component/Timeout/';

class Tryout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tryout: '',
			questions: [],
			loading: true,
			active: 0,
			results: [],
			on_submit: false,
			already_done: false,
			run_timer: true,
		}

		this.changeActive = this.changeActive.bind(this);
		this.appendResult = this.appendResult.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setDuration = this.setDuration.bind(this);
		this.navigation = this.navigation.bind(this);
	} 

	componentDidMount() {
		let tryout = this.props.location.tryout;
		if(this.props.location.tryout) {
			this.setState({ tryout: tryout.tryout , questions: tryout.questions , loading: false });
		} else {
			let tryoutid = this.props.match.params.id;
			let user = JSON.parse(window.sessionStorage.getItem('data_user'));
			axios.get(`student/${user.id}/tryout/do/${tryoutid} `)
			.then(res => {
				this.setState({
					tryout: res.data.tryout,
					questions: res.data.questions,
					loading: false,
					active: 0,
				});
				let duration = res.data.tryout.duration;
				duration = 1;
				this.setDuration(duration);
			}).catch(err => console.log(err));
		}


		// set event navigation
		window.addEventListener('keydown' , (e) => {
			let code = e.keyCode;
			if(code === 37 || code === 40) {
				if(this.state.active > 0) {
					this.navigation('previous');
				}
			} else if(code === 38 || code === 39) {
				if(this.state.active < this.state.questions.length - 1) {
					this.navigation('next');
				}
			}
		})
	}

	setDuration = (time) => {
		let hour = Math.floor(time/60);
		let minute = time % 60;
		let second = 1;
		const timer = setInterval(() => {
			if(minute === 0 && hour !== 0) {
				hour--;
				minute = 60;
			}
			if(second === 0 && minute !== 0) {
				minute--;
				second = 60;
			} else if(second === 0 && minute === 0) {
				this.setState({
					timer: 'WAKTU HABIS',
					run_timer: false,
				})
				stop();
			}
			if(!this.state.run_timer) { stop() }
			second--;
			if(second >= 0) {
				this.setState({
					timer: `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`,
					run_timer: true,
				})
			}
		},1000);

		const addZero = (number) => {
			let status = number.toString().length;
			let response = (status === 1) ? '0'+number : number;
			return response;
		}
		const stop = () => clearInterval(timer);
	}

	changeActive(number) {
		this.setState({ active: number-1 });
	}

	navigation = (status) => {
		(status === 'next') ? this.setState({ active: this.state.active + 1 }) : this.setState({ active: this.state.active - 1 });
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
		this.setState({ on_submit: true, })
		let user = JSON.parse(window.sessionStorage.getItem('data_user'));
		axios.post(`/student/${user.id}/tryout/submit/${this.state.tryout.id} ` , this.state.results)
			.then(res => {
				console.log(res);
				this.setState({
					on_submit: false,
					already_done: true,
					score: res.data,
					timer: 'SELESAI MENGERJAKAN',
					run_timer: false,
				})
			})
	}

	render() {
		if(this.state.loading) {
			return(
				<React.Fragment>
					<Loading status={this.state.loading} size="large" />
				</React.Fragment>
			)
		} else {
			return(
				<React.Fragment>
					<Navbar data={this.state.tryout} timer={this.state.timer} />
					{
						(this.state.timer === 'WAKTU HABIS') ?
							<Timeout />
						:
							<div className="pt-20 px-12 bg-gray-200 w-screen h-screen">
								<Loading status={this.state.loading} size="large"  />
								<Loading status={this.state.on_submit} size="large" />
								{
									(this.state.already_done) ?
										<Result score={this.state.score} />
									:
										<div className="flex flex-row gap-4">
											<div className="w-3/4">
												<Question question={this.state.questions[this.state.active]} totalQuestion={this.state.questions.length} navigation={this.navigation} results={this.state.results} append={this.appendResult} />
											</div>
											<div className="w-1/4">
												<ListNumber change={this.changeActive} active={this.state.active} numbers={this.state.questions} submit={this.handleSubmit} results={this.state.results} onsubmit={this.state.on_submit} />
											</div>
										</div>
								}
							</div>
					}
				</React.Fragment>
			);
		}
	}
}

export default Tryout;
	