import { Request, Response } from "express";
import { Storage } from '../entity/Storage'
import { storageRepository } from "../repository/storageRepository";

export class StorageController{

    async create(req: Request, res: Response): Promise<any>{

        const { name, state, city, street, number } = req.body;

        const newStorage = new Storage();
        newStorage.name = name;
        newStorage.state = state;
        newStorage.city = city;
        newStorage.street = street;
        newStorage.number = number;

        try{
            const savedStorage = await storageRepository.save(newStorage);
            return res.status(201).json(savedStorage);
        }catch(error){
            return res.status(400).json({message: "Erro ao criar registro!"});
        }

    }

    async list(req: Request, res:Response): Promise<any>{

        const storages = await storageRepository.find();

        return res.status(200).send(storages);
        
    }

    async listById(req: Request, res:Response): Promise<any>{

        const { storageId } = req.params;

        const storage = await storageRepository.findOneBy({id: Number(storageId)});

        if(!storage){
            return res.status(404).send();
        }

        return res.status(200).send(storage);

    }

    async update(req: Request, res: Response): Promise<any>{

        const { storageId } = req.params;
        const newStorageData = req.body;

        try{
            
            const storage = await storageRepository.findOneBy({id: Number(storageId)});

            if(!storage){
                return res.send(404).send();
            }

            storageRepository.merge(storage, newStorageData);
            await storageRepository.save(storage);

            return res.status(200).send(storage);

        }catch(error){

            return res.status(500).send({message: "Erro ao atualizar armazém!", error});

        }

    }

    async delete(req: Request, res: Response): Promise<any>{

        const { storageId } = req.params;
        
        const storage = await storageRepository.findOneBy({id: Number(storageId)});

        if(!storage){
            return res.status(404).send();
        }

        await storageRepository.delete({id:Number(storageId)});

        return res.status(204).send();

    }

}