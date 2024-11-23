import { Request, Response } from "express";
import { User } from "../entity/User"
import { userRepository } from "../repository";

export class UserController{

    async create(req: Request, res: Response){
    
        const { firstName, lastName, email, password, carPlate, role } = req.body;
    
        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = password;
        newUser.carPlate = carPlate;
        newUser.role = role;

        const user = await userRepository.findOne({
            where: {
                email
            }
        });

        if (user){
            res.status(401).send({message: "Email já cadastrado no banco de dados!"});
        }

        try{
            const user = await userRepository.save(newUser);
            res.status(201).send(user);
        }catch(error){
            res.status(400).send({message: "Erro ao criar registro!"});
        }

    }

    async list(req: Request, res:Response){

        const users = await userRepository.find();

        res.status(200).send(users)
        
    }

    async listById(req: Request, res:Response){

        const { userId } = req.params;

        const user = await userRepository.findOneBy({id: Number(userId)});

        if(!user){
            res.status(404).send();
        }

        res.status(200).send(user);

    }

    async update(req: Request, res: Response){

        const { userId } = req.params;
        const newUserData = req.body;

        try{
            
            const user = await userRepository.findOneBy({id: Number(userId)});

            if(!user){
                res.send(404).send();
            }

            userRepository.merge(user, newUserData);
            await userRepository.save(user);

            res.status(200).send(user);

        }catch(error){

            res.status(500).send({message: "Erro ao atualizar usuário!", error});

        }

    }

    async delete(req: Request, res: Response){

        const { userId } = req.params;
        
        const user = await userRepository.findOneBy({id: Number(userId)});

        if(!user){
            res.status(404).send();
        }

        await userRepository.delete({id:Number(userId)});

        res.status(204).send();
    }

}