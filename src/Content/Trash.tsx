import React from 'react';
import './media.css';
import star from "../assets/Star.gif"

const Trash: React.FC = () => {
  

  return (
    <div className="media-content">
      {/* Shows Section */}
      <fieldset>
        <legend>Info About This Website</legend>
        <p>I've made this website using React and TypeScript, with the <a href="https://khang-nd.github.io/7.css/" title="7.css"> 7.css</a> framework.
        A lot of the information on this page is reused from my old page
        Also I've used Claude 4.6 to get the Guestbook up and running as I was a bit too lazy to learn how to use Databases. 
        It also helped with stylizing some compontents which weren't included in the CSS-Framework. It also helped me a lot to understand how to work with React.</p>
      </fieldset>

      <fieldset>
        <legend>Here are some other sources which I've used for the website: </legend>
        <p>Music: <a href="https://www.youtube.com/watch?v=mqpgTLH9UP0&list=RDmqpgTLH9UP0&start_radio=1" title="hydrate!"> Frutiger Aero Music</a></p>
        <p>Icons and Inspo: <a href="https://frutigeraeroarchive.org/" title="FrutigerArchive"> frutigeraeroarchive.org</a></p>
      </fieldset>

      <fieldset>
        <legend>Data</legend>

        <label>Current Version:</label>
        <p>1.0 (or smth)</p>

        <label>Last updated:</label>
        <p>27.04.2026</p>

        <img src={star} className="media-image" />
      </fieldset>

      
    </div>
  );
};

export default Trash;