import nodemailer from "nodemailer";
import { smtp } from "../smtp";

export const transporter = nodemailer.createTransport(smtp);
