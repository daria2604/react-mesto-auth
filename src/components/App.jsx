import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import api from "../utils/Api";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isPopupWithConfirmationOpen, setIsPopupWithConfirmationOpen] = React.useState(false);
  const [isInfotooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const handleEsc = (evt) => {
      evt.key === "Escape" && closeAllPopups();
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPopupWithConfirmationOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
    setDeletedCard({});
  }

  function closeOnOverlay(evt) {
    evt.currentTarget === evt.target && closeAllPopups();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .unlikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api
      .updateUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    api
      .updateAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .addCard(newCard)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
    .then(() => {
      setIsSuccess(true)
      setIsInfoTooltipOpen(true)
      navigate('/sign-in', {replace: true})
    })
    .catch((err) => {
      setIsSuccess(false)
      setIsInfoTooltipOpen(true)
      console.log(err + ' - некорректно заполнено одно из полей')
    })
  }

  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
    .then((data) => {
      localStorage.setItem('token', data.token)
      setLoggedIn(true)
      navigate('/', {replace: true})
     })
    .catch((err) => {
      setIsSuccess(false)
      setIsInfoTooltipOpen(true)
      if (err.status === 400) {
        console.log(err + ' - не передано одно из полей')
      } else if (err.status === 401) {
        console.log(err + ' - пользователь с таким email не найден')
      }
    })
  }

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                onCardDelete={setDeletedCard}
                onConfirmationPopup={setIsPopupWithConfirmationOpen}
                element={Main}
                isLoggedIn={isLoggedIn}
              />
            }/>
            <Route path="/sign-in" element={ <Login onLogin={handleLoginSubmit}/> } />
            <Route path="/sign-up" element={ <Register onRegister={handleRegisterSubmit} /> } />
          </Routes>
          {isLoggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onOverlay={closeOnOverlay}
            onLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onOverlay={closeOnOverlay}
            onLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onOverlay={closeOnOverlay}
            onLoading={isLoading}
          />
          <PopupWithConfirmation
            card={deletedCard}
            isOpen={isPopupWithConfirmationOpen}
            onClose={closeAllPopups}
            onOverlay={closeOnOverlay}
            onConfirm={handleCardDelete}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onOverlay={closeOnOverlay}
          />
          <InfoTooltip
            isOpen={isInfotooltipOpen}
            onClose={closeAllPopups}
            onOverlay={closeOnOverlay}
            isSuccess={isSuccess}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
