import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {LiveData} from "../entity/LiveData";
import {validate} from "class-validator";
import {Site} from "../entity/Site";

export class LiveDataController {
    async create(req: Request, res: Response) {
        // validate if req.body.site is valid Site id
        const siteRepository = AppDataSource.getRepository(Site);
        const site = await siteRepository.findOne({ where: { id: req.body?.site } });

        if (!site) {
            res.status(400).json({message: "Invalid site id"});
            return;
        }

        const liveDataRepository = AppDataSource.getRepository(LiveData);
        const liveData = liveDataRepository.create(req.body);
        const errors = await validate(liveData);
        if (errors.length > 0) {
            res.status(400).json(errors);
            return;
        }

        try {
            await liveDataRepository.save(liveData);
        } catch (e) {
            res.status(400).json({message: "Error saving live data"});
            return;
        }
        res.status(201).json(liveData);
    }

    async getLatestBySite(req: Request, res: Response) {
        const siteRepository = AppDataSource.getRepository(Site);
        const site = await siteRepository.findOne({ where: { id: parseInt(req.params.site_id) } });

        if (!site) {
            res.status(400).json({message: "Invalid site id"});
            return;
        }
        const liveDataRepository = AppDataSource.getRepository(LiveData);
        const liveData = await liveDataRepository.findOne({
            relations: ['site'],
            where: {
                site: {
                    id: parseInt(req.params.site_id)
                }
            },
            order: {dt_stamp: "DESC"}
        });
        res.json(liveData);
    }
}
