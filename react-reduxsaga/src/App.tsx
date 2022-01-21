import CounterContainer from "./containers/CounterContainer";
import PostContainer from "./containers/PostContainer";
import PostListContainer from "./containers/PostListContainer";

function App() {
  return (
    <div>
      <CounterContainer />
      <PostListContainer />
      <PostContainer />
    </div>
  );
}

export default App;
