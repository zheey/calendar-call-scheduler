import React from 'react';
import Avatar from './Avatar';

const TopNavBar = () => (
    <nav className="top-navbar">
        <h2>Welcome, Zainab</h2>
        <div className="flex">
            <Avatar/>
        </div>
    </nav>
);

export default TopNavBar;