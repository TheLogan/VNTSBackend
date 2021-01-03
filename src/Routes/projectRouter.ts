import { Router } from 'express'
import { ProjectController } from '../Controllers/ProjectController';
const router = Router();
const controller = new ProjectController();

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.get('/', function (req, res) {
  controller.getOne(req, res);
});

router.post('/', (req, res) => {
  controller.post(req, res);
})

// router.get('/', function (req, res) {
  
// });

export default router;