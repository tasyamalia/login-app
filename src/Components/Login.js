import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Auth } from '../config/firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../Style/styles.css'

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChangeField = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state
        signInWithEmailAndPassword(Auth, email, password)
            .then(res => {
                console.log(res)
                this.props.history.push('/home')
            })
            .catch(error => {
                alert(error.message)
            })
    }
    render() {
        const { email, password } = this.state
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8} lg={4}>
                        <br />
                        <h2>Login</h2>
                        <br />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="text-gray">Email address</Form.Label>
                                <Form.Control type="email" placeholder="" value={email} onChange={this.handleChangeField} name="email" label="Email" required />
                            </Form.Group>
                            <br />
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="text-gray">Password</Form.Label>
                                <Form.Control type="password" placeholder="" value={password} onChange={this.handleChangeField} name="password" label="Password" required />
                                <p><Link className="text-gray" to="/forgot">Forgot your password?</Link></p>
                            </Form.Group>
                            <br />
                            <div className="d-grid gap-2">
                                <Button type="submit" style={{ backgroundColor: '#7275fa', border: 'none' }} size="lg">
                                    Log In
                                </Button>
                            </div>
                        </Form>
                        <br />
                        <br />
                        <center><p className="text-gray">Don't have an account? <Link className="text-sign-up" to="/signup">Sign Up</Link></p></center>
                        <br/>
                        <center><small className="text-gray">This site is protected by reCAPTCHA and the Google&nbsp;
                            <a className="text-gray" href="https://policies.google.com/privacy">Privacy Policy</a> and&nbsp; 
                            <a className="text-gray" href="https://policies.google.com/terms">Terms of Service</a> apply.
                        </small></center>
                    </Col>
                </Row>
            </Container>
        )
    }
}