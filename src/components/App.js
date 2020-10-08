import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useLocation } from 'react-location';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoTooltip';
import * as Auth from '../Auth';
import Page from './Page';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [isDelPopupOpen, setIsDelPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  ////////////////////// 14 спринт
  const escape = require('escape-html');
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isInfoToolOpen, setIsInfoToolOpen] = React.useState(false);
  ////////////////////////////

  //Вызов эффекта загрузки данных пользователя
  React.useEffect(() => {
    api.loadUserInfo()
      .then(result => setCurrentUser(result));
  }, []);

  //Вызов эффекта загрузки карточек на страницу
  React.useEffect(() => {
    api.loadCards()
      .then(cards => {
        setCards(cards);
      });
  }, []);

  //Метод осуществления лайка для карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      });
  }

  //Метод удаления карточки
  function handleCardDelete(card) {
    api.delCard(card._id)
      .then(() => {
        console.log(card._id);
        setCards(cards.filter(c => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
  }

  //Обработчик состояния попапа редактирования
  function onEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  //Обработчик состояния попапа добавления
  function onAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  //Обработчик состояния попапа смены аватары
  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  //Пока неиспользуемый обработчик состояния попапа удаления
  function onDelCard() {
    setIsDelPopupOpen(true);
  }

  //Метод закрытия всех попапов и открытых карточек
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false });
    setIsInfoToolOpen(false);
  }

  //Обработчик состояния попапа открытого изображения
  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      name: card.name
    });
  }

  //Метод обновления данных пользователя
  function handleUpdateUser(name, description) {
    api.editUserProfile(name, description)
      .then(result => setCurrentUser(result))
      .catch(err => console.log(`Error ${err} in editUserAvatar`));

    closeAllPopups();
  }

  //Метод обновления аватара
  function handleUpdateAvatar(avatar) {
    api.editUserAvatar({ url: avatar })
      .then(result => setCurrentUser(result))
      .catch(err => console.log(`Error ${err} in editUserAvatar`));

    closeAllPopups();
  }

  //Метод обработки сабмита попапа добавления
  function handleAddPlaceSubmit(name, link) {
    api.addCard({ name: name, link: link })
      .then(newCard => setCards([...cards, newCard]))
      .catch(err => console.log(`Error ${err} in addCard`));

    closeAllPopups();
  }

  ///////////////////////////////////////// 14 спринт

  function tokenCheck() {
    let token = localStorage.getItem('token');
    if (token) {
      Auth.getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserData(res.data.email);
            history.push('/');
          } else {
            setMessage('Что-то пошло не так! Попробуйте ещё раз.');
            onInfoTooltip();
          }
        })
        .catch(err => console.log(err));
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleRegister(email, password) {
    return Auth.register(escape(email), escape(password))
      .then((res) => {
        if (res.statusCode !== 400) {
          setMessage('Вы успешно зарегистрировались!');
          history.push('/sign-in');
          onInfoTooltip();
        } else {
          setMessage('Что-то пошло не так! Попробуйте ещё раз.');
          onInfoTooltip();
        }
      });
  }

  function handleLogin(email, password) {
    return Auth.authorize(escape(email), escape(password))
      .then((data) => {
        if (!data.message) {
          Auth.getContent(data.token)
            .then((res) => {
              setUserData(res.data.email);
            });
          setMessage('Вы успешно вошли!');
          setLoggedIn(true);
          onInfoTooltip();
        } else {
          setMessage('Что-то пошло не так! Попробуйте ещё раз.');
          onInfoTooltip();
        }
      });
  }

  function signOut() {
    setLoggedIn(false);
    setUserData('');
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  function onInfoTooltip() {
    setIsInfoToolOpen(true);
  }

  ///////////////////////////////////////////////////
  return (
    <CurrentUserContext.Provider value={currentUser}>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <PopupWithForm name='delete' title={'Вы уверены?'} isOpen={isDelPopupOpen} onClose={closeAllPopups} buttonName={'Да'} />
      <ImagePopup cardLink={selectedCard.link} cardName={selectedCard.name} onClose={closeAllPopups} isOpen={selectedCard.isOpen} />
      <InfoToolTip isOpen={isInfoToolOpen} onClose={closeAllPopups} loggedIn={loggedIn} text={message} />

      <div className='page'>
        <Switch>
          <ProtectedRoute exact path='/' loggedIn={loggedIn} component={Page} onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} userData={userData} signOut={signOut} />
          <Route path='/sign-up'>
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path='/sign-in'>
            <Login handleLogin={handleLogin} />
          </Route>
          <Route>
            {<Redirect to={`${loggedIn ? '/' : '/sign-in'}`} />}
          </Route>
        </Switch>
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
