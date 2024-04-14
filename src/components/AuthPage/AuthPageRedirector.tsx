import { Link } from "react-router-dom";
import styles from "./AuthPage.module.css";

export default function AuthPageRedirector({
  text,
  redirectText,
  redirectLink,
}: {
  text: string;
  redirectText: string;
  redirectLink: string;
}) {
  return (
    <span className={styles.redirectors}>
      {text + " "}
      <Link to={redirectLink}>
        <span className={styles.link}>{redirectText}</span>
      </Link>
    </span>
  );
}
