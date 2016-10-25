import KoaRouter from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import queryResolvers from './graphql/resolvers/queries/';
import mutationResolvers from './graphql/resolvers/mutations/';
import { makeExecutableSchema } from 'graphql-tools';

const router = KoaRouter();

router.post('/graphql', graphqlKoa(graphql));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

async function graphql(ctx, next) {
	let Resolvers = Object.assign({}, queryResolvers, mutationResolvers);
	let graphqlSchema = makeExecutableSchema({
		typeDefs: ctx.appCtx.graphqlSchema,
		resolvers: Resolvers,
	});
	return {
		schema: graphqlSchema,
		context: ctx
	}
}

export default router;
