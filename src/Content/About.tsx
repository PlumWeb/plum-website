import React from 'react';
import wave from '../assets/wave.gif'


const About: React.FC = () => {
  return (
    <div className="about-content">
      <fieldset>
        
        <legend>About Me</legend>
        <h2>Hi, I am Plum!</h2>
        <p>
          This Website is a small project I put together for fun, it's an updated version of an old one from 2025.
          <br /> I got inspired to make this Site after 
          seeing some cool Websites others made on Neocities and also by some portfolios from other programmers.
          <br /> I'm really into music and programming.
          <br /> Oh, and I'm German btw.
        </p>
        

        <h2>Hobbies:</h2>
        <p>
          music (primarily guitar), coding, reading, 
          gaming, TTRPGs (like DnD), photography and 3D-Printing
        </p>

        <h2>Favourite Food:</h2>
        <p>
          Pizza, Haribo Pico-Balla, Vöner (Döner with smoked tofu), Potato Gratin, Bean Burgers
        </p>
      </fieldset>

      <fieldset>
         
        <img src={wave} className="media-image" />
      </fieldset>

      

      
    </div>
  );
};

export default About;