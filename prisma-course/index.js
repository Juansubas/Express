import { PrismaClient } from '@prisma/client';

//Este objeto prisma nos permitira hacer las consultas
const prisma = new PrismaClient();

async function main() {
    // const newUser = await prisma.user.create({
    //     data: {
    //         name: "Donna",
    //         email: "Donna123@gmail.com",
    //         posts: {
    //             create: {
    //                 title: "Donna Publicacion",
    //                 content: "A donna le gusta las publicaciones"
    //             }
    //         }
    //     }
    // });
    // console.log(newUser);

    // const users = await prisma.user.findMany({
    //     include: {
    //         posts: true
    //     }
    // });

    // users.forEach(user => {
    //     console.log('----------');
    //     console.log(`User: ${user.name}`);
    //     console.log(`Email: ${user.email}`);

    //     user.posts.forEach((post, i) => {
    //         console.log(`${i}. ${post.title} ${post.content}`);
    //     })
    // })

}


main();