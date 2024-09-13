import { PrismaClient } from '@prisma/client';

//Este objeto prisma nos permitira hacer las consultas
const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data: {
            name: "Joe",
            email: "Joe123@gmail.com"
        }
    });
    console.log(newUser);

    const newPost = await prisma.post.create({
        data: {
            title: "Mi primer publicacion",
            content: "Este es mi primer posts",
            author: {
                connect: {
                    id: newUser.id
                }
            }
        }
    });

    console.log(newPost);
}


main();