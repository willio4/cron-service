import Header from "./components/Header";
import JobForm from "./components/JobForm";
import Nav from "./components/Navigation";
import Summary from "./components/Summary";
import Table from "./components/Table";
import axios from "axios";

export default async function Home() {
  const response = await axios.get("http://localhost:3000/api/endpoints");
  const allJobs = response.data.data || [];

  return (
    <div className="min-h-screen w-screen max-h-screen overflow-x-hidden flex">
      <Nav />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <Summary allJobs={allJobs}/>
          <div className="justify-self-center w-full"><JobForm /></div>
          <Table allJobs={allJobs}/>
        </main>
      </div>
    </div>
  );
}
