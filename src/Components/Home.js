import React, { Component } from 'react'
import { Auth, RealDatabase} from '../config/firebase'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import '../Style/styles.css'
import { ref, get, child } from 'firebase/database';
export default class Home extends Component {
    state = {
        username: '',
        user_uid: ''
    }
    componentDidMount() {
        onAuthStateChanged(Auth, (user) => {
            if (!user) {
                this.props.history.push('/login')
            } else {
                this.setState({ user_uid: user.uid })
                this.getDataUser()
            }
        })
    }
    getDataUser = () => {
        const dbRef = ref(RealDatabase);
        get(child(dbRef, `users/${this.state.user_uid}`))
            .then(snapshot => {
                if (snapshot.exists()) {
                    this.setState({ username: snapshot.val().username })
                } else {
                    console.log('No data available');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
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
                <br />
                <h5>Hi, {this.state.username}</h5>
                <br />
                <h2>EXAM</h2>
                <h2>NIM - 2301968954</h2>
                <h2>NAME - TASYA AMALIA SALSABILA</h2>
            </Container>
        )
    }
}