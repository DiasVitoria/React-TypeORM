import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Teams } from "../entities/Teams";

class TeamController {
    repository = AppDataSource.getRepository(Teams)

    public async ListTeams(req: Request,res: Response):Promise<Response>{
        try{
            const teams: any[] = await this.repository.find({order: {name: 'ASC'}})

            return res.status(200).json(teams)
        }catch(e) {
            res.status(500).json(e.message)
        }
    }

    public async ListByTermo(req: Request,res: Response):Promise<Response>{
        const { termo } = req.params

        try{
            const teams = await this.repository.find({order: {name: 'ASC'}})

            const teamsWithTermo = teams.filter(r => r.name.toUpperCase().includes(termo.toUpperCase()))

            return res.status(200).json(teamsWithTermo)
        }catch(e) {
            res.status(500).json(e.message)
        }
    }

    
    public async Create(req: Request,res: Response):Promise<Response>{
        const { name } = req.body

        try{
            const team = await this.repository.save({ name })


            return res.status(200).json(team)
        }catch(e) {
            res.status(500).json(e.message)
        }
    }

    
    public async Update(req: Request,res: Response):Promise<Response>{
        const { name } = req.body

        try{
            const team = await this.repository.save({ name })


            return res.status(200).json(team)
        }catch(e) {
            res.status(500).json(e.message)
        }
    }
}


