import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Configuration} from "../entity/Configuration";
import {validate} from "class-validator";
import {Site} from "../entity/Site";


export class ConfigurationController {
    async create(req: Request, res: Response) {
        // validate if req.body.site is valid Site id
        const siteRepository = AppDataSource.getRepository(Site);
        const site = await siteRepository.findOne({ where: { id: req.body?.site } });

        if (!site) {
            res.status(400).json({message: "Invalid site id"});
            return;
        }

        const configurationRepository = AppDataSource.getRepository(Configuration);
        const configuration = configurationRepository.create(req.body);
        const errors = await validate(configuration);
        if (errors.length > 0) {
            res.status(400).json(errors);
            return;
        }
        try {
            await configurationRepository.save(configuration);
        } catch (e) {
            res.status(400).json({message: "Error saving configuration"});
            return;
        }
        res.status(201).json(configuration);
    }

    async getBySite(req: Request, res: Response) {
        const siteId = parseInt(req.params.site_id);
        const siteRepository = AppDataSource.getRepository(Site);
        const site = await siteRepository.findOne({ where: { id: siteId } });

        if (!site) {
            res.status(400).json({message: "Invalid site id"});
            return;
        }

        const configurationRepository = AppDataSource.getRepository(Configuration);
        const configurations = await configurationRepository.find({
            relations: ['site'],
            where: {
                site: {
                    id: siteId
                }
            }
        });

        res.json(configurations);
    }
}
