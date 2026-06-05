import Header from "./components/Header";
import Nav from "./components/Navigation";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import Logs from "./components/Logs";

export default async function Home() {
  const response = await axios.get("http://localhost:3000/api/endpoints");
  const allJobs = response.data.data || [];

  return (
    <div className="min-h-screen w-screen max-h-screen overflow-x-hidden flex">
      <Nav />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <Dashboard initialJobs={allJobs} />
          <Logs />
        </main>
      </div>
    </div>
  );
}
