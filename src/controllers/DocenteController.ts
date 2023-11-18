import Docente, { IDocente, IDocenteUpdate } from '../models/docente'
import User from '../models/user'

export default class DocenteController {
    getAll(){
        return new Promise(async (res,rej)=> {
            try {
                const allTeachers = await Docente.find()
                if (!allTeachers){
                    return rej({ msg: 'No hay registro de docentes'})
                }

                return res(allTeachers)
            } catch (e){
                rej({ msg: `${e}`})
            }
        })
    }
    
    getById(id: string){
        return new Promise(async (res,rej)=> {
            try {
                if (id.length !== 24){
                    return rej({ msg: `Id ${id} invalido, debe ser de 24 caracteres`})
                }
                
                const teacher = await Docente.findOne({ _id: id})
                if (!teacher){
                    return rej({ msg: `No existe ningun registro con valor de id ${id}`})
                }

                return res(teacher)
            } catch (e){
                rej({ msg: `${e}`})
            }
        })
    }
    
    add(newTeacher: IDocente){
        return new Promise(async (res,rej)=> {
            try {
                const { usuario_id } = newTeacher
                const user = await User.findOne({ cedula: usuario_id })
                if (!user){
                    return rej({ msg: `No existe ningun usuario con valor de id ${usuario_id}`})
                }

                const createTeacher = new Docente(newTeacher)
                const created = await createTeacher.save()

                return res(created)
            } catch (e){
                rej({ msg: `${e}`})
            }
        })
    }
    
    edit(id: string, newTeacher: IDocenteUpdate ){
        return new Promise(async (res,rej)=> {
            try {
                if (id.length !== 24){
                    return rej({ msg: `Id ${id} invalido, debe ser de 24 caracteres`})
                }

                if (newTeacher?.usuario_id){
                    const user = await User.findOne({ cedula: newTeacher.usuario_id })
                    if (!user){
                        return rej({ msg: `No existe ningun usuario con valor de id ${newTeacher.usuario_id}`})
                    }
                }

                const updatedTeacher = await Docente.findByIdAndUpdate(
                    id,
                    { $set: newTeacher },
                    { new: true }
                )

                if (!updatedTeacher) {
                    return rej({ msg: `No se encontró el docente con id ${id}` });
                }

                return res(updatedTeacher)
            } catch (e){
                rej({ msg: `${e}`})
            }
        })
    }
    
    delete(id: string){
        return new Promise(async (res,rej)=> {
            try {
                if (id.length !== 24){
                    return rej({ msg: `Id ${id} invalido, debe ser de 24 caracteres`})
                }
                
                const teacher = await Docente.findByIdAndDelete(id);
                if (!teacher) {
                    return rej({ msg: `No existe ningun registro con valor de id ${id}`});
                }

                return res({ msg: '¡Eliminado exitosamente!' });
            } catch (e){
                rej({ msg: `${e}` })
            }
        })
    }
}