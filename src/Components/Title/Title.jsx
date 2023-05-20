import styles from "./styles.module.css";
function Title({ title }) {
  return (
    <>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
    </>
  );
}

export default Title;
