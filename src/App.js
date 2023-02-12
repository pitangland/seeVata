import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";

import Router from "./shared/Router";

function App() {
  return (
    <AppLayout>
      <Router />
    </AppLayout>
  );
}

export default App;
