import styles from "./Layout.module.css";
const Layout = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <p>
          Developed with 💗 by{" "}
          <a href="https://github.com/ErF-0" rel="noreferrer" target="_blank">
            ERFaN
          </a>{" "}
        </p>
      </footer>
    </>
  );
};

export default Layout;
