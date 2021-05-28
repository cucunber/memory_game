import React from 'react'
import './App.css';
import MainGame from './Components/MainGame/MainGame';
import Menu from './Components/Menu/Menu';
import Statistic from './Components/Statistic/Statistic';

function App() {

  let [theme, toggleTheme] = React.useState(true)
  let [openMenu, setOpenMenu] = React.useState(true)
  let [openStatistic, setOpenStatistic] = React.useState(false)

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    e.matches ? toggleTheme(false) : toggleTheme(true);
  });

  return (
    <div className={`App ${theme ? "theme_light" : "theme_dark"}`}>
      <header className={`header ${openMenu && "active"}`}>
        <Menu toggleTheme={toggleTheme} theme={theme} openMenu={openMenu} setOpenMenu={setOpenMenu} setOpenStatistic={setOpenStatistic}/>
      </header>
      <main>
        <MainGame setOpenStatistic={setOpenStatistic}/>
      </main>
      <aside className={`aside ${openStatistic && "active"}`}>
        <Statistic openStatistic={openStatistic} setOpenStatistic={setOpenStatistic} setOpenMenu={setOpenMenu}/>
      </aside>
    </div>
  );
}

export default App;