import { useEffect } from 'react';
import { connect } from 'react-redux';

import { isUserLoggedIn } from './redux/user/user.action';

import Header from './components/header/header.component';
import Menu from './components/menu/menu.component';
import Main from './components/main/main.component';
import Footer from './components/footer/footer.component';
import LoginRegister from './components/login-register/login-register.component';
import WithOverlay from './components/with-overlay/with-overlay.component';
import AccountSetting from './components/account-settings/account-settings.component';
import ChangePassword from './components/change-password/change-password.component';
import Loading from './components/loading/loading.component';
import PopupMessage from './components/popup-message/popup-message.component';

import './App.scss';

function App({ currentUser, showModal, loading, isUserLoggedIn }) {
    useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    return (
        <div className="App">
            {!currentUser ? <LoginRegister /> : null}

            {showModal === 'accountSetting' ? (
                <WithOverlay>
                    <AccountSetting />
                </WithOverlay>
            ) : null}
            {showModal === 'changePassword' ? (
                <WithOverlay>
                    <ChangePassword />
                </WithOverlay>
            ) : null}
            <PopupMessage />
            <Header />
            <Menu />
            <Main />
            <Footer />

            {loading ? <Loading /> : null}
        </div>
    );
}

const mapStateToProps = state => ({
    showModal: state.popupModal.showModal,
    loading: state.loading.showLoading,
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    isUserLoggedIn: () => dispatch(isUserLoggedIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
