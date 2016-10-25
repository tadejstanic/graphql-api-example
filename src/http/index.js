import config from '../config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from '../router';
import {ApplicationContext} from '../context';
import cors from 'koa-cors';

class Http {
	constructor() {
		this.config = Object.assign({}, config);
		this.server = null;
	}

	async start() {
		let {port} = this.config;

		// initializing and starting application context
	  let appCtx = new ApplicationContext();
	  await appCtx.start();

		this.server = new Koa();
		this.server
			.use(async (ctx, next) => {
				ctx.appCtx = appCtx;
				await next();
			})
			.use(cors())
			.use(bodyParser())
			.use(router.routes())
			.use(router.allowedMethods());
		return this.server.listen({ port: port });
	}
}

export default Http;
