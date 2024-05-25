import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import styles from "@/themes/global.module.scss";

function App() {
  return (
    <div className={styles.Container}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
