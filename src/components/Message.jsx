import styles from "./Message.module.css";

function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋&nbsp;</span> {message}
    </p>
  );
}

export default Message;
