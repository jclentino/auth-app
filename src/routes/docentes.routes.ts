import express from 'express'
import passport from 'passport'
import DocenteController from '../controllers/DocenteController'

const docente = new DocenteController()
const router = express.Router()

router.get('/docentes', passport.authenticate('jwt', { session: false }), async (req, res)=> {
    try {
        const allTeacher = await docente.getAll()
        return res.status(201).send(allTeacher)
    } catch(e){
        return res.status(400).send(e)
    }
})

router.get('/docentes/:id', passport.authenticate('jwt', { session: false }), async (req, res)=> {
    try {
        const { id } = req.params
        const teacher = await docente.getById(id)
        return res.status(201).send(teacher)
    } catch(e){
        return res.status(400).send(e)
    }
})

router.post('/docentes/add', passport.authenticate('jwt', { session: false }), async (req, res)=> {
    try {
        const { body } = req        
        const newTeacher = await docente.add(body)
        return res.status(201).send(newTeacher)
    } catch(e){
        return res.status(400).send(e)
    }
})

router.patch('/docentes/edit/:id', passport.authenticate('jwt', { session: false }), async (req, res)=> {
    try {
        const { body } = req
        const { id } = req.params
        const newTeacher = await docente.edit(id, body)
        return res.status(201).send(newTeacher)
    } catch(e){
        return res.status(400).send(e)
    }
})

router.delete('/docentes/delete', passport.authenticate('jwt', { session: false }), async (req, res)=> {
    try {
        const { id } = req.body
        const deleted = await docente.delete(id)
        return res.status(201).send(deleted)
    } catch(e){
        return res.status(400).send(e)
    }
})

export default router 