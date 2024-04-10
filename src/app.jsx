import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className= "body text-light">
        <header class="container-fluid">
            <nav class= "navbar fixed-top navbar-dark">
        <a  class="navbar-brand">
          <h1>Gardentimer</h1>
        </a>
        <menu class="navbar-nav" >
          <li class="nav-item">
            <a class="nav-link active" href="index.html" >Home</a></li>
          <li class="nav-item">
            <a class="nav-link" href="garden.html">Garden</a></li>
          <li class="nav-item">
            <a class="nav-link" href="info.html">Plant Info</a></li>
          <li class="nav-item">
            <a class="nav-link" href="about.html">About</a></li>
        </menu>
      </nav>
    </header>
    <main>App components go here</main>
    <footer class="text-white-50">
      <div class="container-fluid"></div>
        <span class="text-reset">Koby Jensen</span>
        <a class="text-reset" href="https://github.com/kobydj/startup.git">GitHub</a>
      </div>
    </footer>  
    </div>
    );
}