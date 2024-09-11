import { PrismaClient } from '@prisma/client';

//Este objeto prisma nos permitira hacer las consultas
const prisma = new PrismaClient();

async function main() {
    // const newUser = await prisma.user.create({
    //     data: {
    //         name: "Juan",
    //         email: "juan@gmail.com"
    //     }
    // });
    // console.log(newUser);

    const users = await prisma.user.findMany();
    console.log(users);

    users.map(user => {
        console.log(`${user.id} - ${user.name}`)
    });
}


main();