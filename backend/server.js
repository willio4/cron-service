
import { ticker } from "./src/utils/ticker.js";
import { work } from "./src/cron_worker.js";
import app from './app.js'

const PORT = process.env.PORT || 3001;

work();

app.get("/", async (req, res) => {
  try {
    const results = await ticker();

    res.json({
      status: "ok",
      jobsWaitingToBeChecked: results.length,
      results: results,
    });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


