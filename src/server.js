import app from './app';
import dotenv from 'dotenv';
dotenv.config();

app.listen(process.env.APP_PORT, () => console.log(`Server is running at port ${process.env.APP_PORT}...`));
