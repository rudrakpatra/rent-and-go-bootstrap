import "./app.scss";
import App from "./App.svelte";

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.setAttribute("data-bs-theme", "dark");
}

const app = new App({
  target: document.getElementById("app"),
});

export default app;
