import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function PageNotFound() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>Page not found 😢</h1>
      </section>
    </main>
  );
}
