import { Request, Response } from "express";
import { User } from "../entity/User"
import { userRepository } from "../repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export class UserController{

    async create(req: Request, res: Response): Promise<any>{
    
        const { firstName, lastName, email, password, carPlate, role } = req.body;
    
        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = await bcrypt.hash(password, 10);
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
            const savedUser = await userRepository.save(newUser);
            return res.status(201).json(savedUser);
        }catch(error){
            return res.status(400).json({message: "Erro ao criar registro!"});
        }

    }

    async list(req: Request, res:Response): Promise<any>{

        const users = await userRepository.find();

        return res.status(200).send(users)
        
    }

    async listById(req: Request, res:Response): Promise<any>{

        const { userId } = req.params;

        const user = await userRepository.findOneBy({id: Number(userId)});

        if(!user){
            return res.status(404).send();
        }

        return res.status(200).send(user);

    }

    async update(req: Request, res: Response): Promise<any>{

        const { userId } = req.params;
        const newUserData = req.body;

        try{
            
            const user = await userRepository.findOneBy({id: Number(userId)});

            if(!user){
                return res.send(404).send();
            }

            userRepository.merge(user, newUserData);
            await userRepository.save(user);

            return res.status(200).send(user);

        }catch(error){

            return res.status(500).send({message: "Erro ao atualizar usuário!", error});

        }

    }

    async delete(req: Request, res: Response): Promise<any>{

        const { userId } = req.params;
        
        const user = await userRepository.findOneBy({id: Number(userId)});

        if(!user){
            return res.status(404).send();
        }

        await userRepository.delete({id:Number(userId)});

        return res.status(204).send();
    }

    async login(req: Request, res: Response): Promise<any>{
        const { 
            email, 
            password 
        } = req.body;
    
        const user = await userRepository.findOne({
            where:{
                email
            }
        });

        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({message: "Email ou senha inválidos!"});
        }
        
        const token = jwt.sign({userId: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: 1800});
        return res.json({ auth: true, token: token });    
    }

}