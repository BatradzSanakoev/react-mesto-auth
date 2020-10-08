import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Login({ handleLogin }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useHistory();

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!email || !password) return;

        handleLogin(email, password)
            .then(() => resetForm())
            .then(() => history.push('/'))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Header headerName='Регистрация' />
            <section className='auth-section'>
                <h2 className='auth-section__title'>Вход</h2>
                <form className='auth-section__form' onSubmit={handleSubmit} noValidate>
                    <input type='email' className='auth-section__input' placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
                    <input type='password' className='auth-section__input' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
                    <button type='submit' className='auth-section__button'>Войти</button>
                </form>
                <p className='auth-section__text'>Еще не зарегистрированы?<Link to='/sign-up' className='auth-section__link'> Регистрация</Link></p>
            </section>
            <Footer />
        </>
    )
}