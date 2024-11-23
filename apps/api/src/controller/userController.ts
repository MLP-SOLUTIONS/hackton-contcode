import { Request, Response } from "express";
import { User } from "../entity/User"
import { userRepository } from "../repository";

export class UserController{

    async create(req: Request, res: Response){
    
        const { firstName, lastName, email, password, birthDate, carPlate, role } = req.body;

        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = password;
        newUser.birthDate = birthDate;
        newUser.carPlate = carPlate;
        newUser.role = role;

        const user = await userRepository.findOne({
            where: {
                email
            }
        });

        if (user){
            return res.status(401).json({message: "Email já cadastrado no banco de dados!"});
        }

        try{
            const user = await userRepository.save(newUser);
            return res.status(201).json(user);
        }catch(error){
            return res.status(401).json({message: "Erro ao criar registro!"});
        }

    }

    async list(req: Request, res:Response){

        const users = await userRepository.find();

        return res.status(200).json(users);
        
    }

    async listById(req: Request, res:Response){

        const { userId } = req.params;

        const user = await userRepository.findOneBy({id: Number(userId)})

        if(!user){
            return res.status(404).send()
        }

        return res.status(200).json(user)

    }

    async update(req: Request, res: Response){

        const { userId } = req.params
        const newUserData = req.body

        try{
            
            const user = await userRepository.findOneBy({id: Number(userId)})

            if(!user){
                return res.send(404).send();
            }

            userRepository.merge(user, newUserData);
            await userRepository.save(user);

            return res.status(200).json(user)

        }catch(error){

            return res.status(500).json({message: "Erro ao atualizar usuário!", error})

        }

    }

    async delete(request: Request, response: Response){

        const { userId } = request.params
        
        const user = await userRepository.findOneBy({id: Number(userId)})

        if(!user){
            return response.status(404).send()
        }

        await userRepository.delete({id:Number(userId)})

        return response.status(204).send()
    }
    
}