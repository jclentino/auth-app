import { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    cedula: number;
    nombre: string;
    telefono: string;
    email: string;
    clave: string;
    compararClave: (clave: string)=> Promise<boolean>
}

const userSchema = new Schema({
    cedula: { 
        type: Number, 
        unique: true, 
        required: true 
    },
    nombre: { 
        type: String, 
        required: true 
    },
    telefono: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    clave: { 
        type: String, 
        required: true 
    },
})

userSchema.pre<IUser>('save', async function (next){
    const user = this 
    if (!user.isModified('clave')) return next()

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.clave, salt)
    user.clave = hash 
    next()
})

userSchema.methods.compararClave = async function (clave: string): Promise<boolean>  {
    return await bcrypt.compare(clave, this.clave)
}   

export default model<IUser>('User', userSchema)

