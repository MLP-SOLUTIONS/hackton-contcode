import { Request, Response } from "express";
import { userRepository, storageRepository } from "../repository";
import { Control } from "../entity/Control";
import { controlRepository } from "../repository/controlRepository";

export class ControlController{

    async create(req: Request, res: Response): Promise<any>{

        const { userId, storageId } = req.params;
        const { date } = req.body;

        const user = await userRepository.findOneBy({
            id: Number(userId)
        })

        if(!user){
            return res.send(404).send();
        }

        const storage = await storageRepository.findOneBy({
            id: Number(storageId)
        })

        if(!storage){
            return res.send(404).send();
        }

        const newControl = new Control();
        newControl.date = date;
        newControl.user = user;
        newControl.storage = storage;

        try{
            const savedControl = await controlRepository.save(newControl);
            return res.status(201).json(savedControl);
        }catch(error){
            return res.status(400).json({message: "Erro ao criar registro!"});
        }

    }

    async list(req: Request, res: Response): Promise<any>{

        const control = await controlRepository.find();

        return res.status(200).send(control)

    }

    async listById(req: Request, res:Response): Promise<any>{

        const { controlId } = req.params;

        const control = await userRepository.findOneBy({id: Number(controlId)});

        if(!control){
            return res.status(404).send();
        }

        return res.status(200).send(control);

    }

}