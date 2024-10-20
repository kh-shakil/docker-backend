import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import routes from './app/routes'

import cookieParser from 'cookie-parser'

const app: Application = express()

const corsOptions = {
  origin: true,
  credentials: true,
}
app.use('*', cors(corsOptions))
app.use(cookieParser())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome HTTP SERVER as docker docker',
  })
});

// throwing an error
app.get("/error", (_req, _res) => {
  throw new Error("This is a forced error");
});

// error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({
    message: err.message
  });
});

// Not Found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Not Found",
  })
})

export default app
