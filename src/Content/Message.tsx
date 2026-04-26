import React from 'react';
import './media.css';
import cat from '../assets/cat-exicited.gif'

const Message: React.FC<{ children?: React.ReactNode }> = () => {
  

  return (
    <fieldset>
        <legend>Contact Me!</legend>
        <p>
          Let me know, if you've got any ideas on what to add or to improve on the website :)
          <br /> Or just text me smth
          <br />
          <br />Discord: plum_6
          <br />E-Mail: plumweb9@gmail.com
        </p>
        <img src={cat} className="media-image" />
      </fieldset>
  );
};

export default Message;