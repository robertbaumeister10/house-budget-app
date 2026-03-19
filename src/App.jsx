import { useState } from "react";
import Header from "./components/Header";
import PaymentPage from "./pages/PaymentPage";
import WhitelistPage from "./pages/WhitelistPage";

function App() {
  const [activePage, setActivePage] = useState("payment");

  return (
    <div className="App">
      <Header activePage={activePage} onNavigate={setActivePage} />
      {activePage === "payment" ? <PaymentPage /> : <WhitelistPage />}
    </div>
  );
}

export default App;
