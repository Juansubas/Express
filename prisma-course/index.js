import { PrismaClient } from '@prisma/client';

//Este objeto prisma nos permitira hacer las consultas
const prisma = new PrismaClient();

async function main() {
    // const newUser = await prisma.user.create({
    //     data: {
    //         name: "Martha",
    //         email: "Martha200@gmail.com"
    //     }
    // });
    // console.log(newUser);

    const user = await prisma.user.upsert({
        where: {
            email: 'john@gmail.com'
        },
        create: {
            email: 'john@gmail.com',
            name: 'john'
        },
        update: {
            lastname: 'Carter'
        }
    });

    console.log(user)
}


main();