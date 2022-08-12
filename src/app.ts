import express, { Express } from 'express';
import bodyParser from 'body-parser';
import Routes from '~/routes';
import { errorHandlerMiddleware } from '~/middlewares';
import cors from 'cors';
import { CorsOptionsType } from './types';

export default class App {
  private readonly app: Express;

  private readonly port: string | number;

  private routes: Routes;

  private readonly corsOptions: CorsOptionsType;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.routes = new Routes(this.app);
    this.corsOptions = {
      origin: [process.env.ADMIN_PANEL_ORIGIN as 'http://127.0.0.1:5173/'],
    };
  }

  private initMiddlewares = () => {
    this.app.use(cors(this.corsOptions));
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    this.initRoutes();

    this.app.use(errorHandlerMiddleware);
  };

  public getApp = () => this.app;

  private initRoutes = () => {
    this.routes.initRoutes();
  };

  public initApp = () => {
    this.initMiddlewares();

    if (import.meta.env.PROD) {
      this.app.listen(this.port, () => {
        console.log(`App running on port ${this.port}.`);
      });
    }
  };
}
