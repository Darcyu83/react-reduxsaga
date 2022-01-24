import { Route, Routes } from "react-router-dom";
import CounterContainer from "./containers/CounterContainer";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/counter" element={<CounterContainer />} />
        <Route path="/" element={<PostListPage />} />
        <Route path="/:id" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
