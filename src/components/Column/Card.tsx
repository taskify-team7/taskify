import styles from "./Card.module.css";
import { CardType } from "../../interface/DashboardType";

export default function Card({ card }: { card: CardType }) {
  return (
    <div className={styles.container}>
      <div>{card.title}</div>
      <div>{card.assignee.nickname}</div>
      <div>{card.dueDate}</div>
      <div>{card.tags}</div>
      {/* <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div> */}
    </div>
  );
}
