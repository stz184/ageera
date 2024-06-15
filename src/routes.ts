import {Router} from "express";
import {SiteController} from "./controller/SiteController";
import {ConfigurationController} from "./controller/ConfigurationController";
import {LiveDataController} from "./controller/LiveDataController";

const router = Router();

const siteController = new SiteController();
const configurationController = new ConfigurationController();
const liveDataController = new LiveDataController();

router.post("/sites", siteController.create);
router.get("/sites", siteController.list);

router.post("/configurations", configurationController.create);
router.get("/configurations/:site_id", configurationController.getBySite);

router.post("/live_data", liveDataController.create);
router.get("/live_data/:site_id/latest", liveDataController.getLatestBySite);

export default router;
