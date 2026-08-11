import Header from "./Header";
import Footer from "./Footer";

import useLenis from "../../hooks/useLenis";

export default function PageShell({ children }) {
  useLenis();

  return (
    <div className="safari-page">
      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
}