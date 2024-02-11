import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

import { TransportOptions } from 'nodemailer';

export class NodemailerEmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        let config: TransportOptions = {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        } as TransportOptions;

        this.transporter = nodemailer.createTransport(config);
    }

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        const message = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: body
        }

        let info = await this.transporter.sendMail(message);
        console.log(info);
    }
}