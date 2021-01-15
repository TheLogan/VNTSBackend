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

  async getAll(req: Request, res: Response) {
    try {
      let projectRepo = getManager().getRepository(Project);
      let projects = projectRepo.find();
      res.send(projects);
    } catch (error) {
      res.status(500);
    }
  }

  async post(req: Request, res: Response) {
    try {
      let prj = req.body;
      console.log('prj', prj);
      let project = new Project();
      project.description = 'Hello world';
      project.isPublished = false;
      project.name = "My first project";
      project.views = 0;

      getManager().save(project);
      res.status(200);
    } catch (error) {
      console.log('error', error);
      res.status(500);
    }
  }
}