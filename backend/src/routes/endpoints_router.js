import { Router } from 'express';
import {
    get_all_endpoints,
    get_endpoint_by_id,
    update_endpoint_by_id,
    create_endpoint,
    delete_endpoint_by_id,
    get_logs_by_id
} from '../controllers/endpoints-controller.js'

const router = Router();

router.get("/api/endpoints", get_all_endpoints);
router.post("/api/endpoints", create_endpoint);
router.get("/api/endpoints/:id", get_endpoint_by_id);
router.patch("/api/endpoints/:id", update_endpoint_by_id);
router.delete("/api/endpoints/:id", delete_endpoint_by_id);
router.get("/api/endpoints/logs/:id", get_logs_by_id);

export default router;