import "./login-page.scss";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div id="login-page">
      <header>Social App</header>
      <div id="login-form-container">
        <LoginForm />
      </div>
      <footer>
        Photo by{" "}
        <a href="https://unsplash.com/@marekpiwnicki?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Marek Piwnicki
        </a>{" "}
        on{" "}
        <a href="/t/textures-patterns?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </footer>
    </div>
  );
}
