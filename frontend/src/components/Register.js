import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, FormGroup, Input, Button } from 'reactstrap';

const Register = () => {

	const [cred, setCred] = useState({email: '', name:'' , password: '', company: '', telephone:''});

	const Register = () => {
		axios.post('http://localhost:5000/register', cred)
		.then(res => {
				console.log("Register OK - ",res);
		})
		.catch(err => {
			console.log("Error login", err);
		});
	}
	return(
		<div className="d-flex h100 amethyst whiteColor">
			<div className="d-flex justify-content-center m-auto text-center h100">
			<Row>
				<Col className="mt-4" md="12">
					<h1>Sign Up</h1>
					<FormGroup>
							<label>Name</label>
							<Input
								placeholder="Your name"
								type="text"
								onChange={e => setCred({...cred, name: e.target.value})}
							/>
					</FormGroup>
					<FormGroup>
							<label>Email adress</label>
							<Input
								placeholder="Email for login"
								type="text"
								onChange={e => setCred({...cred, email: e.target.value})}
							/>
					</FormGroup>
					<FormGroup >
							<label>Company Name</label>
							<Input
								placeholder="Your company"
								type="text"
								onChange={e => setCred({...cred, company: e.target.value})}
							/>
					</FormGroup>
					<FormGroup >
							<label>Telephone number</label>
							<Input
								placeholder="Your Telephone"
								type="text"
								onChange={e => setCred({...cred, telephone: e.target.value})}
							/>
					</FormGroup>
					<FormGroup className="mt-2">
							<label>Password</label>
							<Input
								placeholder="Password"
								type="password"
								onChange={e => setCred({...cred, password: e.target.value})}
							/>
					</FormGroup>
					<Row className="my-5"> 
							<Button className="btn-fill m-auto" onClick={Register} color="primary" type="submit"> Create an account </Button>
					</Row>
					<Link to="/login">Already have an account ? Sign in.</Link>
				</Col>
			</Row>
			</div>
		</div>
	);
}

export default Register;