import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Auth } from '../config/firebase'
import {updatePassword} from 'firebase/auth';
import '../Style/styles.css'
import { Link } from 'react-router-dom'

export default class ChangePassword extends Component {
    state = {
        password: '',
        isError: false,
        errorMessage: "",
    }
    handleChangeField = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({ isError: false, errorMessage: "" });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { password } = this.state
        const uppercaseRegExp = /(?=.*?[A-Z])/
        const lowercaseRegExp = /(?=.*?[a-z])/
        const digitsRegExp = /(?=.*?[0-9])/
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/
        const minLengthRegExp = /.{8,}/
        const uppercasePassword = uppercaseRegExp.test(password)
        const lowercasePassword = lowercaseRegExp.test(password)
        const digitsPassword = digitsRegExp.test(password)
        const specialCharPassword = specialCharRegExp.test(password)
        const minLengthPassword = minLengthRegExp.test(password)
        let errMsg =""
        if (!minLengthPassword) {
            errMsg = "Password at least minumum 8 characters";
        } else if (!uppercasePassword) {
            errMsg = "Password at least one Uppercase";
        } else if (!lowercasePassword) {
            errMsg = "Password at least one Lowercase";
        } else if (!digitsPassword) {
            errMsg = "Password at least contains one number";
        } else if (!specialCharPassword) {
            errMsg = "Password at least one Special Characters";
        } else{
            errMsg=""
        }
        if(errMsg !== ""){
            this.setState({ isError: true, errorMessage: errMsg });
        }else{
            this.setState({ isError: false, errorMessage: "" });
            updatePassword(Auth.currentUser, password)
            .then(() => {
                this.props.history.push('/login')
            })
            .catch(error => {
                alert(error.message)
            })
        }

    }
    render() {
        const { password } = this.state
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8} lg={4}>
                        <br/>
                        <h2>Change Password</h2>
                        <br/>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label  className="text-gray">New Password</Form.Label>
                                <Form.Control type="password" placeholder="" value={password} onChange={this.handleChangeField} name="password" label="Password" required/>
                            </Form.Group>
                            {this.state.isError ? (
                                <div class="alert alert-danger" role="alert">
                                    {this.state.errorMessage}
                                </div>
                            ) : null}
                            <br/>
                            <div className="d-grid gap-2">
                                <Button style={{backgroundColor:'#7275fa', border:'none'}} type="submit" size="lg">
                                Change Password
                                </Button>
                                <Link className="text-sign-up" to="/home">Back To Home</Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}