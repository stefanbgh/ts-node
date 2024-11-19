import nodemailer from "nodemailer";
import smtpConfig from "../config/smtp.config";

export const transporter = nodemailer.createTransport(smtpConfig);