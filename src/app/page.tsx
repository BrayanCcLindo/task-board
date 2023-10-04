import Layout from "./components/layout";
import Header from "./components/header";
import Board from "./components/board";
import { TrelloProvider } from "./trelloContext";

export default function Home() {
  return (
    <TrelloProvider>
      <Layout>
        <Header />
        <Board />
      </Layout>
    </TrelloProvider>
  );
}
