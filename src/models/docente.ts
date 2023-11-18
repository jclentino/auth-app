import { model, Schema, Document } from 'mongoose'

export interface IDocente extends Document {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    blog?: string;
    profesional?: boolean;
    escalaron?: boolean;
    idioma?: string;
    añosExperiencia?: number;
    areaTrabajo?: string;
    usuario_id: string;
}

export interface IDocenteUpdate extends Document {
    nombre?: string;
    apellidos?: string;
    email?: string;
    telefono?: string;
    blog?: string;
    profesional?: boolean;
    escalaron?: boolean;
    idioma?: string;
    añosExperiencia?: number;
    areaTrabajo?: string;
    usuario_id?: string;
}


const docenteSchema = new Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    apellidos: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    telefono: { 
        type: String, 
        required: true 
    },
    blog: {
        type: String 
    },
    profesional: { 
        type: Boolean 
    },
    escalaron: { 
        type: Boolean 
    },
    idioma: { 
        type: String 
    },
    añosExperiencia: { 
        type: Number 
    },
    areaTrabajo: { 
        type: String 
    },
    usuario_id: { 
        type: Number, 
        ref: 'User', 
        required: true 
    },
})

export default model<IDocente>('Docente', docenteSchema)

