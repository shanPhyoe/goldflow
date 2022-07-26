import React, { useState } from 'react';

import Navbar from '../navbar/navbar.component';
import Logo from '../logo/logo.component';
import Calendar from '../calendar/calendar.component';
import User from '../user/user.component';

import './menu.styles.scss';
import IconButton from '../iconbutton/iconbutton.component';

const Menu = () => {
    const [menuShown, setMenuShown] = useState(false);

    return (
        <aside className={`menu ${menuShown ? 'menu--active' : ''}`}>
            <Logo className="menu__logo" />
            <div className="menu__button">
                <IconButton onClick={() => setMenuShown(!menuShown)}>
                    <div className="menu__icon">
                        <div />
                        <div />
                        <div />
                    </div>
                </IconButton>
            </div>
            <div className="menu__overlay" />
            <div className="menu__calendar">
                <Calendar />
            </div>
            <div className="menu__navbar">
                <Navbar />
            </div>
            <div className="menu__user">
                <User />
            </div>
        </aside>
    );
};

export default Menu;
