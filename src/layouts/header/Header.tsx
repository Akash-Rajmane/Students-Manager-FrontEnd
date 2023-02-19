import classes from './Header.module.scss';
import {BsPeopleFill} from "react-icons/bs";
import MainImage from './main-image.webp';

const Header = () => {

  return (
    <header className={classes.header}>
       <img fetchpriority='high' src={MainImage} alt="img" className={classes.mainImg}/>
      <section>
        <div className={classes.themeIcon}><BsPeopleFill/></div>
        <div>Students Manager</div>
      </section>
    </header>
  )
};

export default Header;