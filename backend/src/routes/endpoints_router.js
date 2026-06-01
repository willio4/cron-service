import { Router } from 'express';
import {
    get_all_endpoints,
    get_endpoint_by_name,
    update_endpoint_by_name,
    create_endpoint,
    delete_endpoint_by_name,
    get_logs_by_name
} from '../controllers/endpoints-controller.js'

const router = Router();

router.get("/api/endpoints", get_all_endpoints);
router.post("/api/endpoints", create_endpoint);
router.get("/api/endpoints/:name", get_endpoint_by_name);
router.put("/api/endpoints/:name", update_endpoint_by_name);
router.delete("/api/endpoints/:name", delete_endpoint_by_name);
router.get("/api/endpoints/logs/:name", get_logs_by_name);

export default router;