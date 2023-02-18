import React, { Component } from 'react'
import { Auth } from '../config/firebase'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import '../Style/styles.css'

export default class Home extends Component {
    componentDidMount() {
        onAuthStateChanged(Auth, (user) => {
            if (!user) {
                this.props.history.push('/login')
            }else{
                console.log(user.uid)
            }
        })
    }
    handleLogOut = () => {
        signOut(Auth)
    }
    handleChangePassword = () => {
        this.props.history.push('/change_password')
    }
    render() {
        return (
            <Container>
                <form className='form-home'>
                    <Button onClick={this.handleChangePassword} variant="outline-primary" color="primary">Change Password</Button>
                    <Button className='btn-logout' onClick={this.handleLogOut} variant="outline-primary" color="primary">Logout</Button>
                </form>
                <br/>
                <h5>Hi, </h5>
                <br/>
                <h2>EXAM</h2>
                <h2>NIM - 2301968954</h2>
                <h2>NAME - TASYA AMALIA SALSABILA</h2>
            </Container>
        )
    }
}