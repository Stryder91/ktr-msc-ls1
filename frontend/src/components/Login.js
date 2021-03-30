import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { Col, Row, FormGroup, Input, Button } from 'reactstrap';

// We should check the required field name from both front-end and back-end (for security)
const Login = ({set_Token, tokenFromStore}) => {

    const [cred, setCred] = useState({name: '', password: '',});

    const Login = () => {
        axios.post('http://localhost:5000/login', cred)
        .then(res => {
            /* We always need to protect our code when retrieving infos from API calls*/
            if (res.data && 'access_token' in res.data) {
                set_Token({'token': res.data.access_token, 'user': res.data.username});
            } else {
                console.log("No access TOKEN!");
            }
        })
        .catch(err => {
          console.log("Error login", err);
        });
    }
    if (tokenFromStore) {
        return <Redirect push to="/app" />;
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
                            required
                            placeholder="Username for login"
                            type="text"
                            onChange={e => setCred({...cred, name: e.target.value})}
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
                        <Button className="btn-fill m-auto" onClick={Login} color="success" type="submit"> Login </Button>
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