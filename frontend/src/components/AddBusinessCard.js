import axios from 'axios';
import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row, FormGroup, Input, Button } from 'reactstrap';

const AddBusinessCard = ({loggedUser}) => {
    const fields = [
        {
            name: 'email', 
            placeholder: 'Email address'
        },
        {
            name: 'name', 
            placeholder: 'The name'
        },
        {
            name: 'company', 
            placeholder: 'The company'
        },
        {
            name: 'telephone', 
            placeholder: 'the telephone'
        },
    ];
    const [item, setItem] = useState({email: '', name:'', company: '', telephone:'', user:loggedUser.user.email });

    // We are adding a new business card from someone else
    // But we flag our own name on it to recognize whom this card belongs to.
    const AddItem = () => {
        axios.post('http://localhost:5000/addItem', item)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
          console.log("Error adding item : ", err)
        });
    }
    return(
        <div className="d-flex">
            <div className="d-flex justify-content-center m-auto text-center">
            <Row>
                <Col md="12">
                    <h1>I am adding a new business card</h1>
                    {(fields && fields.length > 0) 
                    ? fields.map((field, index) => <FormGroup key={index}> 
                        <label>{field.placeholder}</label>
                        <Input
                            placeholder={field.placeholder}
                            type="text"
                            onChange={e => setItem({...item, [field.placeholder]: e.target.value})}
                        />
                    </FormGroup>)
                    : "Error"}
                    <Row className="my-5"> 
                        <Button className="btn-fill m-auto" onClick={AddItem} color="primary" type="submit"> Create an account </Button>
                    </Row>
                    <Link to="/">Return to Business Cards menu</Link>
                </Col>
            </Row>
            </div>
        </div>
    );
}
const getProps = state => {
    return {
      loggedUser  : state.access_token
    }
}
export default connect(getProps, null)(AddBusinessCard);