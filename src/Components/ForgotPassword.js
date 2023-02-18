import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { Auth } from '../config/firebase'
import {sendPasswordResetEmail} from 'firebase/auth';
import '../Style/styles.css'

export default class ForgotPassword extends Component {
    state = {
        email: '',
    }
    handleChangeField = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { email } = this.state
        sendPasswordResetEmail(Auth, email)
            .then(() => {
                alert('Please check your email to change password!')
                this.props.history.push('/login')
            })
            .catch(error => {
                alert(error.message)
            })
    }
    render() {
        const { email } = this.state
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8} lg={4}>
                        <br/>
                        <h2>Forgot Password</h2>
                        <br/>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label  className="text-gray">Email address</Form.Label>
                                <Form.Control type="email" placeholder="" value={email} onChange={this.handleChangeField} name="email" label="Email" required/>
                            </Form.Group>
                            <br/>
                            <div className="d-grid gap-2">
                                <Button style={{backgroundColor:'#7275fa', border:'none'}} type="submit" size="lg">
                                Send Email Reset Password
                                </Button>
                            </div>
                        </Form>
                        <br/>
                        <br/>
                        <center><p  className="text-gray">Have an account? <Link  className="text-sign-up" to="/login">Login</Link></p></center>
                    </Col>
                </Row>
            </Container>
        )
    }
}