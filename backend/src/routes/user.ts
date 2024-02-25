import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput} from "@namans933/common-app"

const userRoutes = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

userRoutes.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
  
    try {
      const user = await prisma.user.create({
        data : {
          email : body.email,
          password : body.password,
          name : body.name
        }
  
      });
      const jwt = await sign({id : user.id}, c.env.JWT_SECRET);
      return c.json({jwt});
  
    }catch(e){
      c.status(403);
      return c.json({error : "Error while signing up!!"});
    }
  })
  
  userRoutes.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }

    const user = await prisma.user.findUnique({
      where : {
        email : body.email,
      }
    });
  
    if (!user){
      c.status(403);
      return c.json({error: "Invalid Credentials!!!"})
    }
    else{
      const jwt = await sign({id : user.id}, c.env.JWT_SECRET);
      return c.json({jwt});
    }
  })

  export default userRoutes;

