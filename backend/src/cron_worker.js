import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


import cron from "node-cron";
import axios from "axios";
import { ticker } from "./utils/ticker.js";
import { 
    find_next_exec_and_end, 
    insert_log_successfully, 
    insert_log_with_error, 
    set_job_to_running 
} from "./utils/db-functions.js";

export function work() {
    cron.schedule("*/10 * * * * *", async () => {
        console.log("⏰ Heartbeat: Checking database for due jobs...");
        try {
            const dueJobs = await ticker();
            
            if (dueJobs.length > 0) {
                console.log(`Found ${dueJobs.length} Jobs`);
                for (const job of dueJobs) {
                    console.log(`🚀 Executing Cron Job: "${job.name}"`);
                    
                    await set_job_to_running(job);
                    
                    let start = Date.now();
                    
                    try {
                        const response = await axios.get(job.target_url);
                        await insert_log_successfully(job, start, response);
                    } catch (err) {
                        await insert_log_with_error(job, start, err);
                    }
                    
                    await find_next_exec_and_end(job);
                }
            }
        } catch (error) {
            console.error("❌ Error checking cron database:", error);
        }
    });
}
