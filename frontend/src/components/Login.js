import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { Col, Row, FormGroup, Input, Button } from 'reactstrap';

const Login = ({set_Token}) => {

    const [cred, setCred] = useState({email: '', name:'' , password: '', company: '', telephone:''});

    const Login = () => {
        axios.post('http://localhost:5000/login', cred)
        .then(res => {
            if (res.data && 'access_token' in res.data) {
                set_Token({'token': res.data.access_token, 'user': res.data.username});
            } else {
                console.log("No access TOKEN!")
            }
        })
        .catch(err => {
          console.log("Error login", err)
        });
    }
    return(
        <div className="d-flex h100 amethyst whiteColor">
            <div className="d-flex justify-content-center m-auto text-center h100">
            <Row>
                <Col className="m-auto" md="12">
                    <h1>Login</h1>
                    <FormGroup>
                        <label>Username</label>
                        <Input
                            placeholder="Username for login"
                            type="text"
                            onChange={e => setCred({...cred, name: e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Email</label>
                        <Input
                            placeholder="Your email address"
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
                        <Button className="btn-fill m-auto" onClick={Login} color="primary" type="submit"> Create an account </Button>
                    </Row>
                    <Link to="/signup">No account yet ? Sign up!</Link>
                </Col>
            </Row>
            </div>

        </div>
    );
}
const getProps = state => {
    return {
      tokenFromStore : state.access_token,
    }
}
// to SET to the store as dispatch
const setProps = dispatch => {
    return {
        set_Token: tok => {
            dispatch({type: "SET_TOKEN", tok});
        },
    }
};  
export default connect(getProps, setProps)(Login);