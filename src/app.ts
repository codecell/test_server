import boxen from "boxen";
import express, { Application, Request, Response } from "express"
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

// routes
import indexRoute from "./routes/index.routes"
import usersRoutes from "./routes/user.routes";


// Swagger docs
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

const corsOptions: any = {
  origin: '*',
  optionsSuccessStatus: 200
}

export default class App {
  private app: Application;

  constructor () {
    this.app = express()
    this.app.use(cors(corsOptions));
    this.app.use(indexRoute)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(morgan('dev'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  routes () {
    this.app.use("/api/users", usersRoutes);
    this.app.use("*", 
      (req: Request, res: Response) => res.json({ status: 404, message: "Uh oh!, Page not found" })
    );
  }

  async listen () {
    const port = process.env.PORT || 7000;

    try {
      await this.app.listen(port)

      console.log("started!!!")
      console.log(
				boxen(`Server Listening on port: ${port}`, {
					padding: 1,
					borderStyle: "double",
					borderColor: "green",
				})
			);

    } catch (e) {
      console.log(boxen("Server Failed to start", { borderColor: "red", padding: 1, }), e);
    }
  }
}

