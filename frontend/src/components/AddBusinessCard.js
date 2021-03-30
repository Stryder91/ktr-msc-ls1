import axios from 'axios';
import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row, FormGroup, Input, Button } from 'reactstrap';

const AddBusinessCard = ({loggedUser}) => {
    // We need to implement the mandatory/optional statement for each field

    const businessCardFields = [
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
    const [card, setCard] = useState({email: '', name:'', company: '', telephone:'', user:loggedUser.user.name });
    // We are adding a new business card from someone else
    // But we flag our own name on it to recognize whom this card belongs to.
    const AddCard = () => {
        axios.post('http://localhost:5000/addBusinessCard', card)
        .then(res => {
            console.log("Add business card OK - ",res)
        })
        .catch(err => {
          console.log("Error adding card : ", err)
        });
    }
    return(
        <div className="d-flex">
            <div className="d-flex justify-content-center m-auto text-center">
            <Row className=" my-5">
                <Col md="8 m-auto">
                    <h1>I am adding a new business card</h1>
                    {/**Mapping fields is more scalable -> We retrive each field from fields 
                     * We are are using [field.placeholder] to render dynamically the key of the card object
                    */}
                    {(businessCardFields && businessCardFields.length > 0) 
                    ? businessCardFields.map((field, index) => <FormGroup key={index}> 
                        <label>{field.placeholder}</label>
                        <Input
                            placeholder={field.placeholder}
                            type="text"
                            onChange={e => setCard({...card, [field.name]: e.target.value})}
                        />
                    </FormGroup>)
                    : "Error"}
                    {/*We sould display a component instead of "Error" -> to continue*/}
                    <Row className="my-5"> 
                        <Button className="btn-fill m-auto" onClick={AddCard} color="success" type="submit"> Add a business card </Button>
                    </Row>
                    <Link to="/">Return to Business Cards menu</Link>
                </Col>
            </Row>
            </div>
        </div>
    );
}

/** We are using props from the Store to get the information about the loggedUser */
const getProps = state => {
    return {
      loggedUser  : state.access_token
    }
}
export default connect(getProps, null)(AddBusinessCard);