import React from 'react';
import './about.css';

export function About() {
  return (
    <main className="main container-fluid text-dark text-center">

    <div className="picture-box" id="picture" ><img width="400px" src="/harvest picture.jpg" alt="harvest picture" /></div>

    <p className="description">
      Gardentimer allows you to keep track of when you planted things as well as helpful information for each plant
    </p>

  </main>
  );
}