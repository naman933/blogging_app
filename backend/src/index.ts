import { Hono } from 'hono'
import { cors } from 'hono/cors'
import userRoutes from './routes/user'
import blogRoutes from './routes/blog'


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

app.use('/api/*', cors())

app.route('/api/v1/user/', userRoutes);
app.route('/api/v1/blog/', blogRoutes);



export default app
