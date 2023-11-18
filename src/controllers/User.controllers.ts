import { Request, Response } from 'express'
import User, { IUser } from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config/config'


const generarToken = (user: IUser)=> {
    return jwt.sign({ id: user._id, email: user.email}, config.jwtSecret)
}


export const signUp = async (req: Request ,res: Response) => {
    try {
        if (!req.body.email || !req.body.clave || !req.body.cedula){
            return res.status(400).send({ msg: 'Por favor, envia tu cedula, email o contraseña'})
        }
    
        const isExistEmail = await User.findOne({ email: req.body.email })
        if (isExistEmail){
            return res.status(400).send({ msg: `El usuario con email ${req.body.email} ya existe`})
        }

        const isExistCedula = await User.findOne({ cedula: req.body.cedula })
        if (isExistCedula){
            return res.status(400).send({ msg: `El usuario con cedula ${req.body.cedula} ya existe`})
        }
    
        const newUser = new User(req.body)
        await newUser.save()

        res.status(201).send(newUser)   
    }  catch(e){
        res.status(400).send({ msg: `${e}`})
    }
}

export const signIn = async (req: Request ,res: Response)=> {
    try {
        if (!req.body.email || !req.body.clave){
            return res.status(400).send({ msg: 'Por favor, envia tu email o contraseña'})
        }
    
        const user = await User.findOne({ email: req.body.email })
        if (!user){
            return res.status(400).send({ msg: 'El usuario no existe'})
        }
    
        const isMatch = await user.compararClave(req.body.clave)
        if (isMatch){
            return res.status(200).send({ token: generarToken(user) })
        }
    
        return res.status(400).send({ msg: 'El email o la clave son incorrectas'})
    } catch (e){
        res.status(400).send({ msg: `${e}`})
    }
}