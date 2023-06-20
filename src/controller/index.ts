import { Router, Request, Response } from "express";
import MessageResponse from "../model/message-response";
import todoController from "./todo.controller";

const router: Router = Router();


const index = router.get<{}, MessageResponse>('/', (req: Request, res: Response) => {
    res.json({ message: 'Api running.' })
})

router.get('/', index);
router.use('/todo', todoController);

export default router;