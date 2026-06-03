import Header from "./components/Header";
import JobForm from "./components/JobForm";
import Nav from "./components/Navigation";
import Summary from "./components/Summary";

export default function Home() {
  return (
    <div className="min-h-screen w-screen max-h-screen overflow-hidden flex">
      <Nav />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <Summary />
          <div className="justify-self-center w-full"><JobForm /></div>
          
        </main>
      </div>
    </div>
  );
}
