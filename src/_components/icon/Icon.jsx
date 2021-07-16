import React from 'react'
import Travel from 'Assets/icons/svg/travel.svg'
import Qna from 'Assets/icons/svg/qna.svg'
import Miscellaneous from 'Assets/icons/svg/miscellaneous.svg'
import Funny from 'Assets/icons/svg/funny.svg'
import Reddit from 'Assets/icons/svg/reddit.svg'
import Quora from 'Assets/icons/svg/quora.svg'
import Teenagers from 'Assets/icons/svg/teenagers.svg'
import Relationship from 'Assets/icons/svg/relationship.svg'
import Confidence from 'Assets/icons/svg/confidence.svg'
import Pics from 'Assets/icons/svg/pics.svg'
import Videos from 'Assets/icons/svg/videos.svg'
import Musics from 'Assets/icons/svg/musics.svg'
import Movies from 'Assets/icons/svg/movies.svg'
import Sports from 'Assets/icons/svg/sports.svg'
import Health from 'Assets/icons/svg/health.svg'
import Fashion from 'Assets/icons/svg/fashion.svg'
import Tips from 'Assets/icons/svg/tips.svg'
import Motivated from 'Assets/icons/svg/motivated.svg'
import Art from 'Assets/icons/svg/art.svg'
import Photography from 'Assets/icons/svg/photography.svg'
import Etc from 'Assets/icons/svg/etc.svg'
import Comic from 'Assets/icons/svg/comic.svg'
import Food from 'Assets/icons/svg/food.svg'
import News from 'Assets/icons/svg/news.svg'
import Life from 'Assets/icons/svg/life.svg'
import Gardening from 'Assets/icons/svg/gardening.svg'
import Pets from 'Assets/icons/svg/pets.svg'
import Business from 'Assets/icons/svg/business.svg'
import Stock from 'Assets/icons/svg/stock.svg'
import Cars from 'Assets/icons/svg/car.svg'
import Housing from 'Assets/icons/svg/housing.svg'
import MysticalSpirituality from 'Assets/icons/svg/mystical-spirituality.svg'
import FengShui from 'Assets/icons/svg/fengshui.svg'
import Architecture from 'Assets/icons/svg/architecture.svg'
import Landscape from 'Assets/icons/svg/landscape.svg'
import School from 'Assets/icons/svg/school.svg'
import Books from 'Assets/icons/svg/books.svg'
import Literature from 'Assets/icons/svg/literature.svg'
import NoSleep from 'Assets/icons/svg/nosleep.svg'
import History from 'Assets/icons/svg/history.svg'
import Astronomy from 'Assets/icons/svg/astronomy.svg'
import Philosophy from 'Assets/icons/svg/philosophy.svg'
import Horoscope from 'Assets/icons/svg/horoscope.svg'
import ScienceAndTechnology from 'Assets/icons/svg/science-and-technology.svg'
import Engineering from 'Assets/icons/svg/engineering.svg'
import Game from 'Assets/icons/svg/game.svg'
import Math from 'Assets/icons/svg/math.svg'
import VietNam from 'Assets/icons/svg/vietnam.svg'
import World from 'Assets/icons/svg/world.svg'
import { Forum, Emoji } from 'Templates/icon/IconsSvg'
// import Emoji from 'Assets/icons/svg/emoji.svg'

export const Icons = {
  Emoji: 'Emoji',
  World: 'World',
  VietNam: 'VietNam',
  Math: 'Math',
  Engineering: 'Engineering',
  Game: 'Game',
  ScienceAndTechnology: 'ScienceAndTechnology',
  Horoscope: 'Horoscope',
  Travel: 'Travel',
  Philosophy: 'Philosophy',
  Qna: 'Qna',
  NoSleep: 'NoSleep',
  Astronomy: 'Astronomy',
  History: 'History',
  Architecture: 'Architecture',
  Landscape: 'Landscape',
  FengShui: 'FengShui',
  Books: 'Books',
  Literature: 'Literature',
  School: 'School',
  Housing: 'Housing',
  MysticalSpirituality: 'MysticalSpirituality',
  Cars: 'Cars',
  Stock: 'Stock',
  Business: 'Business',
  Reddit: 'Reddit',
  Miscellaneous: 'Miscellaneous',
  Quora: 'Quora',
  Funny: 'Funny',
  Confidence: 'Confidence',
  Pics: 'Pics',
  Relationship: 'Relationship',
  Teenagers: 'Teenagers',
  Videos: 'Videos',
  Musics: 'Musics',
  Movies: 'Movies',
  Sports: 'Sports',
  Health: 'Health',
  Tips: 'Tips',
  Photography: 'Photography',
  Fashion: 'Fashion',
  Motivated: 'Motivated',
  Art: 'Art',
  Gardening: 'Gardening',
  Pets: 'Pets',
  Life: 'Life',
  News: 'News',
  Comic: 'Comic',
  Etc: 'Etc',
  Food: 'Food',
  Forum: 'Forum',
}

const IconComponents = {
  Emoji,
  World,
  VietNam,
  Math,
  Engineering,
  Game,
  ScienceAndTechnology,
  Horoscope,
  Travel,
  Philosophy,
  Qna,
  NoSleep,
  Astronomy,
  History,
  Architecture,
  Landscape,
  FengShui,
  Books,
  Literature,
  School,
  Housing,
  MysticalSpirituality,
  Cars,
  Stock,
  Business,
  Reddit,
  Miscellaneous,
  Quora,
  Funny,
  Confidence,
  Pics,
  Relationship,
  Teenagers,
  Videos,
  Musics,
  Movies,
  Sports,
  Health,
  Tips,
  Photography,
  Fashion,
  Motivated,
  Art,
  Gardening,
  Pets,
  Life,
  News,
  Comic,
  Etc,
  Food,
  Forum,
}

export const Icon = ({ icon, width, height, color, ...rest }) => {
  const IconFile = IconComponents[icon]

  return <>{IconFile && <IconFile {...rest} width={width || 24} height={height} color={color} />}</>
}
