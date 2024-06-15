import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Site} from "../entity/Site";
import {validate} from "class-validator";

export class SiteController {
    async create(req: Request, res: Response) {
        const siteRepository = AppDataSource.getRepository(Site);
        const site = siteRepository.create(req.body);
        const errors = await validate(site);
        if (errors.length > 0) {
            res.status(400).json(errors);
            return;
        }
        try {
            await siteRepository.save(site);
        } catch (e) {
            res.status(400).json({message: "Error saving configuration"});
            return;
        }
        res.status(201).json(site);
    }

    async list(req: Request, res: Response) {
        const siteRepository = AppDataSource.getRepository(Site);
        const sites = await siteRepository.find();
        res.json(sites);
    }
}

