import styles from "../styles/Home.module.css";

export default function Time({ time }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{time}</h1>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      time: new Date().getSeconds(),
    },
    revalidate: 10,
  };
}
