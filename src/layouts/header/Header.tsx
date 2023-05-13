import classes from './Header.module.scss';
import {BsPeopleFill} from "react-icons/bs";


const Header = () => {
  const imgClass = `${classes.mainImg} ${classes.imgAnimation}`
  
  return (
    <header className={classes.header}>
       <img 
        fetchpriority='high'
        src="https://ik.imagekit.io/Akash/main-image.webp?updatedAt=1682152851908"
        alt="img" 
        className={imgClass}
        />
      <section>
        <div className={classes.themeIcon}><BsPeopleFill/></div>
        <div>Students Manager</div>
      </section>
    </header>
  )
};

export default Header;
