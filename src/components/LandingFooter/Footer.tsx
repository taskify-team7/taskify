import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const snsSection = [
  {
    name: "mail",
    imgSrc: "/Icons/mail.svg",
    link: "https://github.com/taskify-team7/taskify",
  },
  {
    name: "facebook",
    imgSrc: "/Icons/facebook.svg",
    link: "https://www.facebook.com/",
  },
  {
    name: "instagram",
    imgSrc: "/Icons/instagram.svg",
    link: "https://www.instagram.com/",
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.company}>@codeit - 2023</div>
      <div className={styles.information}>
        <div>Privacy Policy</div>
        <div>FAQ</div>
      </div>
      <div className={styles.sns}>
        {snsSection.map((sns) => {
          return (
            <Link to={sns.link} target="__blank" key={sns.name}>
              <img src={sns.imgSrc} alt={sns.name} width={22} height={22} />
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
