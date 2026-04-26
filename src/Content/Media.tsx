import React from 'react';
import './media.css';

// Import all show images
import bsd from '../assets/shows/bsd.jpg';
import jojo from '../assets/shows/jojo.png';
import dungeonMeshi from '../assets/shows/dungeonMeshi.png';
import bocchi from '../assets/shows/bocchi.png';
import aot from '../assets/shows/aot.png';
import chainsaw from '../assets/shows/chainsaw.jpg';
import wonderEgg from '../assets/shows/wonderEgg.jpg';
import breakingbad from '../assets/shows/breakingbad.jpg';
import django from '../assets/shows/django.jpg';

// Import all book images

interface MediaItem {
  title: string;
  description: string[];
  image: string;
}

const Media: React.FC = () => {
  const shows: MediaItem[] = [
    {
      title: 'Bungo Stray Dogs',
      description: [
        'BSD is crazy.',
        'The story is amazing and I\'ve rarely been this surprised by plottwists in an anime >:D',
        'Fun Fact: A year after I watched the anime, my friend mentioned, all the characters in BSD are inspired by real life authors.',
        'I had no idea. Not once did I make the connection while watching.',
        'It came up during a convo, where I joked about how, when I search for the Author Osamu Dazai, I get images from the BSD character instead of the author O_o',
        'I felt so dumb TwT'
      ],
      image: bsd
    },
    {
      title: 'JoJo\'s Bizarre Adventure',
      description: [
    `My name is Yoshikage Kira. I'm 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest. I don't smoke, but I occasionally drink. I'm in bed by 11 PM, and make sure I get eight hours of sleep, no matter what. After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning. Just like a baby, I wake up without any fatigue or stress in the morning. I was told there were no issues at my last check-up. I'm trying to explain that I'm a person who wishes to live a very quiet life. I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night. That is how I deal with society, and I know that is what brings me happiness. Although, if I were to fight I wouldn't lose to anyone.`
  ],
      image: jojo
    },
    {
      title: 'Delicious in Dungeon',
      description: [
        'I love Delicious in Dungeon :D',
        'The concept in itself is really smart and well made.',
        'It also helped me to get a lot of inspiration for my own dnd campaigns :)',
        'It\'s really cozy too.',
        'I can only recommend watching it ^^'
      ],
      image: dungeonMeshi
    },
    {
      title: 'Bocchi the Rock',
      description: [
        'Well Bocchi the Rock is kind of special for me.',
        'It\'s one of the only animes I like rewatching multiple times. I first stumbled upon the anime, when I started playing guitar again.',
        'The anime helped me to stay motivated, since I wanted to learn some of the awesome songs in the anime.',
        'It also helped me a lot to continue making/producing music myself.',
        'Well, now, quite some time in the future, I am able to play some of their songs on guitar >:D'
      ],
      image: bocchi
    },
    {
      title: 'Attack on Titan',
      description: [
        'Insane Anime.',
        'I mean nearly everyone I know has watched Attack on Titan.',
        'There isn\'t much to add... But I gotta say, the last Season was crazy!'
      ],
      image: aot
    },
    {
      title: 'Chainsaw Man',
      description: [
        'I\'ve seen the anime and the movie. Both are great!',
        'And I\'ve reacently started reading the manga :)'
      ],
      image: chainsaw
    },
    {
      title: 'Wonder Egg Priority',
      description: ['The Art-Style and animation in this anime are crazy.'],
      image: wonderEgg
    },
    {
      title: 'Breaking Bad',
      description: [
        'I finally finished Breaking Bad this year! After repeatedly watching a season and then taking months-long breaks, I made it through.',
        'The End of Breaking Bad felt satisfying and fitting for the show ^^'
      ],
      image: breakingbad
    },
    {
      title: 'Django Unchained',
      description: [
        'A good movie.',
        'I could write some stuff about it like for the other things before but I am getting lazy now and feel like my comments only get worse and worse and more repetitive...'
      ],
      image: django
    }
  ];

  
  return (
    <div className="media-content">
      {/* Shows Section */}
      <fieldset>
        <legend>Shows</legend>
        <p>Here are some shows/anime, I really enjoy also without any particular order. :)</p>
      </fieldset>

      {shows.map((show, index) => (
        <fieldset key={`show-${index}`}>
          <legend>{show.title}</legend>
          <div className="media-item">
            <div className="media-text">
              {show.description.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <img src={show.image} alt={show.title} className="media-image" />
          </div>
        </fieldset>
      ))}

      

      
    </div>
  );
};

export default Media;