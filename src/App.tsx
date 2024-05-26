import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "@/themes/global.module.scss";

const HomePage = lazy(() => import("./pages/home"));

function App() {
  return (
    <div className={styles.Container}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
