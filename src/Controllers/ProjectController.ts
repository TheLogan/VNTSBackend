import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Project } from "../Models/Project";
import qs from "querystring";
import url from "url";

export class ProjectController {

  async getOne(req: Request, res: Response) {
    try {
      let id = Number(req.query.id);
      let projectRepo = getManager().getRepository(Project);
      let project = await projectRepo.findOne({ id: id });

      res.send(project);
    } catch (error) {
      res.status(500);
    }
  }

  getAll() {

  }

  async post(req: Request, res: Response) {
    try {
      let project = new Project();
      project.description = 'Hello world';
      project.isPublished = false;
      project.name = "My first project";
      project.views = 0;

      getManager().save(project);
    } catch (error) {
      console.log('error', error);
      res.status(500);
    }
  }
}