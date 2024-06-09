import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const snsSection = [
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
  const handleEmailClick = () => {
    const email = "yunbh0401@gmail.com";
    const subject = "Taskify 사용자 문의사항";
    const body = "문의사항을 입력해주세요";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.company}>@codeit - 2023</div>
      <div className={styles.information}>
        <div>Privacy Policy</div>
        <div>FAQ</div>
      </div>
      <div className={styles.sns}>
        <button type="button" onClick={handleEmailClick}>
          <img src="/Icons/mail.svg" alt="메일" />
        </button>
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
