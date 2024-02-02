import { Request, Response } from 'express';
import {GetUserCase} from '../../application/GetByUserCase';

export default class GetByIdController {
    constructor(readonly getByUserCase: GetUserCase) { }
    
    async execute(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const user = await this.getByUserCase.executeById(id);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}