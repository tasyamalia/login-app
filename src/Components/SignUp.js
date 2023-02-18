import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Auth, RealDatabase } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../Style/styles.css'
import { ref, set } from 'firebase/database';
export default class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        isError: false,
        errorMessage: "",
    }
    isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);
    handleChangeField = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({ isError: false, errorMessage: "" });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password } = this.state
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
        let errMsg = ""
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
        } else {
            errMsg = ""
        }
        if (errMsg !== "") {
            this.setState({ isError: true, errorMessage: errMsg });
        } else {
            createUserWithEmailAndPassword(Auth, email, password)
                .then(res => {
                    set(ref(RealDatabase, `users/${res.user.uid}/`), {
                        username: username,
                        email: email,
                        uid: res.user.uid,
                    });
                    this.props.history.push('/login');
                })
                .catch(err => {
                    alert(err.message)
                })
        }

    }
    render() {
        const { username, email, password } = this.state
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8} lg={4}>
                        <br />
                        <h2>Sign Up</h2>
                        <br />
                        <Form onSubmit={this.handleSubmit}>
                        <br />
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label className="text-gray">Username</Form.Label>
                                <Form.Control type="username" placeholder="" value={username} onChange={this.handleChangeField} name="username" label="Username" required />
                            </Form.Group>
                            <br />
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-gray">Email address</Form.Label>
                                <Form.Control type="email" placeholder="" value={email} onChange={this.handleChangeField} name="email" label="Email" required />
                            </Form.Group>
                            <br />
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="text-gray">Password</Form.Label>
                                <Form.Control type="password" placeholder="" value={password} onChange={this.handleChangeField} name="password" label="Password" required />
                            </Form.Group>
                            {this.state.isError ? (
                                <div class="alert alert-danger" role="alert">
                                    {this.state.errorMessage}
                                </div>
                            ) : null}
                            <br />
                            <div className="d-grid gap-2">
                                <Button style={{ backgroundColor: '#7275fa', border: 'none' }} type="submit" size="lg">
                                    Sign Up
                                </Button>
                            </div>
                        </Form>
                        <br />
                        <br />
                        <center><p className="text-gray">Have an account? <Link className="text-sign-up" to="/login">Login</Link></p></center>
                    </Col>
                </Row>
            </Container>
        )
    }
}