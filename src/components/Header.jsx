import React from 'react';
import s from './Modules/Header.module.css';

function Header() {
  return (
    <header id={s.head}>
        <h1>Emoji Finder</h1>
        <p>Find emoji by keywords</p>
    </header>
  )
}

export default Header