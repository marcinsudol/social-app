import "./login-page.scss";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div id="login-page">
      <header>
        <h1>Social App</h1>
        <ul>
          <li>Only Front-End part of the app</li>
          <li>Mock data fetched from json files</li>
        </ul>
      </header>

      <main id="login-form-container">
        <LoginForm />
      </main>

      <footer>
        Photo by{" "}
        <a
          href="https://unsplash.com/@marekpiwnicki?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noreferrer"
        >
          Marek Piwnicki
        </a>{" "}
        on{" "}
        <a
          href="https://unsplash.com/@marekpiwnicki?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noreferrer"
        >
          Unsplash
        </a>
      </footer>
    </div>
  );
}
