import { Hono } from 'hono'
import userRoutes from './routes/user'
import blogRoutes from './routes/blog'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

app.route('/api/v1/user/', userRoutes);
app.route('/api/v1/blog/', blogRoutes);



export default app
