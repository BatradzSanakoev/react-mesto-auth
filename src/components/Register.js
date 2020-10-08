import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import * as Auth from '../Auth';

const Register = ({ handleRegister }) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useHistory();

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!email || !password) {
            console.log('Необходимо заполнить все поля');
            return;
        }

        handleRegister(email, password)
            .then(() => resetForm())
            .then(() => history.push('/sign-in'))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Header headerName='Войти' />
            <section className='auth-section'>
                <h2 className='auth-section__title'>Регистрация</h2>
                <form className='auth-section__form' onSubmit={handleSubmit} noValidate>
                    <input type='email' className='auth-section__input' placeholder='Email' onChange={(evt) => setEmail(evt.target.value)}></input>
                    <input type='password' className='auth-section__input' placeholder='Password' onChange={(evt) => setPassword(evt.target.value)}></input>
                    <button type='submit' className='auth-section__button'>Зарегистрироваться</button>
                </form>
                <p className='auth-section__text'>Уже зарегистрированы?<Link to='/sign-in' className='auth-section__link'> Войти</Link></p>
            </section>
            <Footer />
        </>
    )
};

export default Register;