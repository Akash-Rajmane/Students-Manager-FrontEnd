import classes from './Footer.module.scss';
import {BsPeopleFill} from "react-icons/bs";

const Footer = () => {
  let year = new Date().getFullYear();
 
  let content = `© Students Manager ${year}. All Rights Reserved.`;

  return (
    <footer className={classes.footer}>
      <div className={classes.branding}>
        <span className={classes.themeIcon}><BsPeopleFill/> </span><span>Students Manager</span>
      </div>
      <div className={classes.content}>
        {content}
      </div>
    </footer>
  );
};

export default Footer;
