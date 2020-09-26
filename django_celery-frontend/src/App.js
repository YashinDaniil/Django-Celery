import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import './App.css'

class App extends React.Component {
	getTaskStatus = (taskId) => {
		let interval = setInterval(function () {
			axios
				.get(`http://localhost:8000/tasks/${taskId}/`)
				.then((res) => {
					let today = new Date();
					const time = today.getHours() + ":" + ((today.getMinutes() < 10) ? '0' + today.getMinutes() : today.getMinutes()) + ":" + ((today.getSeconds() < 10) ? '0' + today.getSeconds() : today.getSeconds());
					let taskList = document.querySelector('#tasks-list tbody').innerHTML;
					taskList = `<tr class=${(res.data.task_status === 'SUCCESS') ? 'success-row' : ''}>
									<td '>${res.data.task_id}</td>
									<td >${res.data.task_status}</td>
									<td >${res.data.task_result}</td>
									<td >${time}</td>
								</tr>` + taskList;
					document.querySelector('#tasks-list tbody').innerHTML = taskList;
					if (res.data.task_status === 'SUCCESS' || res.data.task_status === 'FAILURE') {
						clearInterval(interval)
					}
				})
				.catch((err) => {
					console.log(err)
				});
		}, 1000)
	};

	startTask = (type) => {
		axios
			.post('http://localhost:8000/tasks/', JSON.stringify({type: type}))
			.then((res) => {
				this.getTaskStatus(res.data.task_id);
			})
			.catch((err) => {
				console.log(err)
			});
	};

	clearTasksList = () => {
		document.querySelector('#tasks-list tbody').innerHTML = ''
	};

	render() {
		return (
			<div className="container">
				<h1 className='mb-30 mt-30'>Tasks</h1>
				<div>Choose a task length:</div>
				<button className='btn btn-primary' onClick={this.startTask.bind(this, 10)}>Fast</button>
				<button className='btn btn-primary' onClick={this.startTask.bind(this, 30)}>Normal</button>
				<button className='btn btn-primary' onClick={this.startTask.bind(this, 60)}>Long</button>
				<button className='btn btn-dark float-right' onClick={this.clearTasksList}>Clear task list</button>
				<h3 className='mb-30 mt-30'>Task Status</h3>
				<div className='table-wrapper'>
					<table className='table' id='tasks-list' style={{'width': '100%'}}>
						<thead className='thead-dark'>
						<tr className=''>
							<th className='taskIdCol'>ID</th>
							<th className='otherCol'>Status</th>
							<th className='otherCol'>Result</th>
							<th className='otherCol'>Time</th>
						</tr>
						</thead>
						<tbody>

						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default App;
