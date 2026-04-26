import React from 'react';
import './Media.css';

// Import all game images
import minecraft from '../assets/games/minecraft.png';
import projectZomboid from '../assets/games/pz.jpg';
import stardewValley from '../assets/games/stardew.jpg';
import terraria from '../assets/games/terraria.jpg';
import huntShowdown from '../assets/games/hunt.jpg';
import inscryption from '../assets/games/inscryption.jpg';
import tarkov from '../assets/games/eft.jpg';
import cultOfTheLamb from '../assets/games/cult.jpg';
import redDeadRedemption from '../assets/games/rdr.png';
import enterTheGungeon from '../assets/games/gungeon.png';
import eldenRing from '../assets/games/elden.png';
import factorio from '../assets/games/factorio.jpg';
import balatro from '../assets/games/Balatro.jpg';
import cyber from '../assets/games/cyberpunk.jpg';

import miner from '../assets/minecraft-pikachu.gif';

interface MediaItem {
  title: string;
  description: string[];
  image: string;
}

const Games: React.FC = () => {
  const games: MediaItem[] = [
    {
      title: 'Minecraft',
      description: [
        'I mainly play modded Minecraft.',
        'I also like making Modpacks and usually host the servers my friends and me play on ^^',
        'If you need help with something, you can just message me :>'
      ],
      image: minecraft
    },
    {
      title: 'Project Zomboid',
      description: [
        'I love Project Zomboid.',
        'I\'ve always been looking for a game that actually feels like surviving a zombie apocalypse.',
        'And Project Zomboid fucking nails it.',
        'It\'s really fun to play together with friends :)',
        'Dont let the game graphics fool you and try it yourself'
      ],
      image: projectZomboid
    },
    {
      title: 'Stardew Valley',
      description: [
        'I like this game, I usually play it 1-2 times a year for a week.',
        'It\'s also quite fun to play together with friends :)',
        'I\'ve actually not played that much modded Stardew Valley but I will try it soon I think.'
      ],
      image: stardewValley
    },
    {
      title: 'Cyberpunk 2077',
      description: [
        'Fun to play!',
        'I love the quickhack feature, and the story is also nice'
      ],
      image: cyber
    },
    {
      title: 'Factorio',
      description: [
        'I just love automation games. Automation is also my favourite activity when playing modded MC',
       
      ],
      image: factorio
    },
    {
      title: 'Terraria',
      description: ['Good. Just good.'],
      image: terraria
    },
    {
      title: 'Hunt Showdown',
      description: [
        'I mean it can be kind of toxic sometimes, but I still like it.',
        'I\'m also just a fan of extraction shooters in general!',
        'The general vibe of the game is nice too ^^',
        'And I usually play it with one of my friends, which makes the game a lot more fun!'
      ],
      image: huntShowdown
    },
    {
      title: 'Balatro',
      description: [
        'The new solitaire'
      ],
      image: balatro
    },
    {
      title: 'Inscryption',
      description: [
        'Hmm cards'
      ],
      image: inscryption
    },
    {
      title: 'Escape from Tarkov',
      description: [
        'I play this game like ~3 times a year for like 1-2 Weeks.',
        'But usually I dont play it online, but rather a Singleplayer Mod for it, which makes it less grindy and sweaty :)',
        'It also helps a lot with the problem the game has with cheaters and the pay-to-progress/win System.',
        'But it is still a lot of fun in Singleplayer ^^ Like I said, I like Extraction Shooters :D'
      ],
      image: tarkov
    },
    {
      title: 'Cult of the Lamb',
      description: [
        'Fun to play!',
        'It\'s nice and calming but also kind of stressful in the right moments.',
        'I think the games art style is really cute too :)'
      ],
      image: cultOfTheLamb
    },
    {
      title: 'Red Dead Redemption 2',
      description: ['An awesome game with an awesome story ^^'],
      image: redDeadRedemption
    },
    {
      title: 'Enter the Gungeon',
      description: [
        'This game is awesome :D',
        'I\'ve played it on the switch and PC.',
        'Enter the Gungeon has the most creative Items, I\'ve ever seen in a game!',
        'The gameplay loop is also really rewarding :)'
      ],
      image: enterTheGungeon
    },
    {
      title: 'Elden Ring',
      description: [
        'I mean what can I say, it\'s just a good game.',
        'But I don\'t have the DLC tho. :('
      ],
      image: eldenRing
    }
  ];

  return (
    <div className="media-content">
      <fieldset>
        <legend>Games</legend>
        <p>Here are some video games I really enjoy without any order. :D</p>
         <img src={miner} className="media-image" />
      </fieldset>

      {games.map((game, index) => (
        <fieldset key={`game-${index}`}>
          <legend>{game.title}</legend>
          <div className="media-item">
            <div className="media-text">
              {game.description.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <img src={game.image} alt={game.title} className="media-image" />
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default Games;