import React , { createContext } from 'react';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

export const ClassContext = createContext();

class ClassContextProvider extends React.Component
{
	_isMounted = false;
	constructor(props)
	{
		super(props);

		this.state = {
			levels: [],
			sub_classes: [],
			classes: [],
			courses: [],
			get_levels_loading: true,
			get_sub_classes_loading: true,
			get_classes_loading: true,
			del_levels_loading: false,
			del_sub_classes_loading: false,
			del_classes_loading: false,
		}

		this.addLevel = this.addLevel.bind(this);
		this.addSubClasses = this.addSubClasses.bind(this);
		this.addClass = this.addClass.bind(this);
		this.removeLevel = this.removeLevel.bind(this);
		this.removeSub = this.removeSub.bind(this);
		this.removeClass = this.removeClass.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get classes
		axios.get(`school/${this.context.id}/class/list` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ classes: res.data , get_classes_loading: false });
				}
			})

		// get level classes
		axios.get(`school/${this.context.id}/class/level` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ levels: res.data , get_levels_loading: false });
				}
			}).catch(err => console.log(err));

		// get sub class 
		axios.get(`school/${this.context.id}/class/sub` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ sub_classes: res.data , get_sub_classes_loading: false });
				}
			}).catch(err => console.log(err));

		// get list courses
		axios.get(`school/${this.context.id}/course` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({courses: res.data});
				}
			}).catch(err => console.log(err))
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addLevel = async (newLevel) => {
		let response = await axios.post(`/school/${this.context.id}/class/level/add` , newLevel , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({ levels: [...this.state.levels , res.data] });
				return res.status;
			}).then(status => {
				return status;
			}).catch(err => console.log(err));
		return response;
	}

	addSubClasses = async(newSub) => {
		let response = await axios.post(`/school/${this.context.id}/class/sub/add` , newSub , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({ sub_classes: [...this.state.sub_classes , res.data] });
				return res.status;
			}).then(status => status).catch(err => console.log(err));
		return response;
	}

	addClass = async (newClass) => {
		let response = await axios.post(`/school/${this.context.id}/class/add` , newClass , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({ classes: [...this.state.classes , res.data] });
				return res.status;
			}).then(status => status).catch(err => console.log(err));
		return response;
	}

	removeLevel = (id) => {
		this.setState({ del_levels_loading: true });
		axios.delete(`/school/${this.context.id}/class/level/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({ 
					levels: this.state.levels.filter(level => level.id !== id) , 
					del_levels_loading: false,
				});
			}).catch(err => console.log(err));
	}

	removeSub = (id) => {
		this.setState({ del_sub_classes_loading: true });
		axios.delete(`/school/${this.context.id}/class/sub/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				console.log(res);
				this.setState({ 
					sub_classes: this.state.sub_classes.filter(sub => sub.id !== id) , 
					del_sub_classes_loading: false,
				});
			}).catch(err => console.log(err));
	}

	removeClass = (id) => {
		this.setState({ del_classes_loading: true });
		axios.delete(`/school/${this.context.id}/class/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					classes: this.state.classes.filter(data => data.id !== id),
					del_classes_loading: false,
				});
			}).catch(err => console.log(err));
	}

	render() {
		return (
			<ClassContext.Provider value={{ 
							...this.state , 
							addLevel: this.addLevel , 
							addSubClasses: this.addSubClasses ,
							addClass: this.addClass,
							removeLevel: this.removeLevel,
							removeSub: this.removeSub,
							removeClass: this.removeClass,
						}} >
				{this.props.children}
			</ClassContext.Provider>
		)
	}
}

ClassContextProvider.contextType = AuthContext;
export default ClassContextProvider;