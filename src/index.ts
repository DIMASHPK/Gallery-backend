import './configs';
import App from './app';

const app = new App();
app.initApp();

export const viteNodeApp = app.getApp();
