import classes from './Footer.module.css';
import {BsPeopleFill} from "react-icons/bs";

const Footer = () => {
  let year = new Date().getFullYear();
 
  let content = `© Students Manager ${year}. All Rights Reserved.`;

  return (
    <footer className={classes.footer}>
      <section className={classes.section}>
        <div className={classes.themeIcon}><BsPeopleFill/></div>
        <div>Students Manager</div>
      </section>
      <aside className={classes.aside}>
        {content}
      </aside>
    </footer>
  );
};

export default Footer;
