import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from "@namans933/common-app"

const blogRoutes = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET : string,
	}
    Variables : {
		userId: string
	}
}>();

blogRoutes.use('/*', async (c, next) => {
 const jwt = c.req.header("Authorization");
    if (!jwt){
      c.status(401);
      return c.json({error : "Unauthorized!!"});
    }
  
    const token = jwt.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload){
      c.status(401);
      return c.json({error : "Unauthorized!!"});
    }
    c.set('userId', payload.id);
    await next()
  })
  
blogRoutes.post('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

    try{
        const post = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : userId
            }
        });

        return c.json({
            id : post.id
        })
    }catch(e){
        c.status(401);
        return c.json({error : "Error creating post!!!"});
    }
})

blogRoutes.put('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    const body = await c.req.json();

    const { success } = updatePostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

    try{
        const updatepost = await prisma.post.update({
            where : {
                id : body.id,
                authorId : userId
            },
            data : {
                title : body.title,
                content : body.content
            }
        });

        return c.json({
            message : "Post Updated!!"
        })
    }catch(e){
        c.status(401);
        return c.json({error : "Error in updating post!!!"})
    }
})

blogRoutes.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    try{
        const post = await prisma.post.findUnique({
            where : {
                id 
            }
        });
        return c.json(post);
    }catch(e){
        c.status(401);
        return c.json({error : "Post not found!!!"})
    }
    
})


export default blogRoutes;