import React, { useState, useEffect } from 'react';
import './App.css';
import pedrinhoImg from './assets/Pedrinho.jpg';
import carlosImg from './assets/Carlos.jpg';
import adicionarusuarioImg from './assets/adicionar usuário.png';
import controllerIcon from './assets/controller icon.png';
import logoImg from './assets/logo ps5.png';
import hoverSound from './assets/PS5 Select Sound(3).mp3';
import clickSound from './assets/PS2 Select Sound(2).mp3';
import backgroundMusic from './assets/PS4 INTRO THEME SONG.mp3'; 
import newIcon from './assets/mouse icon.png';
import perfilIcon from './assets/icon charging.png';

import jogo1Img from './assets/jogo1.jpg';
import jogo2Img from './assets/jogo2.jpg';
import jogo3Img from './assets/jogo3.jpg';

function App() {
  const [user, setUser] = useState(null);
  const [zoomUser, setZoomUser] = useState(null);
  const [hoveredGame, setHoveredGame] = useState(null);
  const hoverAudio = new Audio(hoverSound);
  const clickAudio = new Audio(clickSound);

  const playHoverSound = () => {
    const sound = hoverAudio.cloneNode();
    sound.volume = 0.5;
    sound.play().catch((e) => {
      console.warn('Falha ao tocar som (hover):', e);
    });
  };

  const playClickSound = () => {
    const sound = clickAudio.cloneNode();
    sound.volume = 0.8;
    sound.play().catch((e) => {
      console.warn('Falha ao tocar som (click):', e);
    });
  };

  const users = [
    { name: 'Pedrinho', image: pedrinhoImg },
    { name: 'Carlos', image: carlosImg },
    { name: 'Adicionar Usuário', image: adicionarusuarioImg },
  ];

  const gameImages = [
    { name: 'Crash Twinsanity', image: jogo1Img },
    { name: 'Grand Theft Auto V', image: jogo2Img },
    { name: 'The Legend Of Spyro: Dawn of the Dragon', image: jogo3Img },
  ];

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      cursor.remove();
    };
  }, []);

  // 🎵 Música de fundo
  useEffect(() => {
    const music = new Audio(backgroundMusic);
    music.loop = true;
    music.volume = 0.2;
    music.play().catch((e) => {
      console.warn('Falha ao tocar música de fundo:', e);
    });

    return () => {
      music.pause();
      music.currentTime = 0;
    };
  }, []);

  const handleUserSelection = (user) => {
    playClickSound();
    if (user.name === 'Adicionar Usuário') {
      alert('Adicionando novo usuário...');
    } else {
      setZoomUser(user.name);
      setTimeout(() => {
        setUser(user.name);
      }, 1000);
    }
  };

  const handleBackToHome = () => {
    playClickSound();
    setUser(null);
    setZoomUser(null);
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: hoveredGame ? `url(${hoveredGame})` : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      {!hoveredGame && (
        <video autoPlay muted loop className="background-video" style={{ opacity: hoveredGame ? 0 : 1 }}>
          <source src="background-waves-blue.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo HTML5.
        </video>
      )}

      {!user ? (
        <img src={logoImg} alt="Logo" className="logo" />
      ) : (
        <div className="user-header">
          <img
            src={users.find((u) => u.name === user)?.image}
            alt={user}
            className="user-header-image"
          />
          <span className="user-header-name">{user}</span>
          <img src={perfilIcon} alt="Perfil Icon" className="user-header-icon" />
        </div>
      )}

      <div className="overlay">
        {!user ? (
          <>
            <div className="title-with-icon">
              <img src={controllerIcon} alt="Controller" className="icon" />
              <h2>DUALSHOCK 4 wireless controller connected.</h2>
            </div>
            <h3>Who is using this controller?</h3>
            <div className="user-list">
              {users.map((u) => (
                <div
                  key={u.name}
                  className={`user-card ${zoomUser === u.name ? 'zoom-in' : ''}`}
                  onClick={() => handleUserSelection(u)}
                  onMouseEnter={playHoverSound}
                >
                  <img
                    src={u.image}
                    alt={u.name}
                    className={`user-image ${zoomUser === u.name ? 'zoom' : ''}`}
                  />
                  <span className="user-name">{u.name}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="game-list">
              {gameImages.map((game) => (
                <div
                  key={game.name}
                  className="game-card"
                  onMouseEnter={() => {
                    playHoverSound();
                    setHoveredGame(game.image);
                  }}
                  onMouseLeave={() => setHoveredGame(null)}
                  onClick={playClickSound}
                >
                  <img src={game.image} alt={game.name} className="game-image" />
                  <span className="game-title">{game.name}</span>
                </div>
              ))}
            </div>
            <button
              className="button back-button"
              onMouseEnter={playHoverSound}
              onClick={handleBackToHome}
            >
              Voltar
            </button>
          </>
        )}
      </div>

      <div className="bottom-left-icon">
        <img src={newIcon} alt="Avançar Icon" className="new-icon" />
        <h4 className="new-text">Clique para avançar</h4>
      </div>
    </div>
  );
}

export default App;
