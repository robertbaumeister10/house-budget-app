import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PaymentPage from "./pages/PaymentPage";
import WhitelistPage from "./pages/WhitelistPage";
import BalancePage from "./pages/BalancePage";
import HouseMemberPage from "./pages/HouseMemberPage";

function App() {
  const [activePage, setActivePage] = useState("balance");

  return (
    <div className="App">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <main className="app-content">{pages[activePage] ?? <BalancePage />}</main>
      <Footer />
    </div>
  );
}

const pages = {
  balance: <BalancePage />,
  whitelist: <WhitelistPage />,
  housemember: <HouseMemberPage />,
  payment: <PaymentPage />,
};

export default App;
