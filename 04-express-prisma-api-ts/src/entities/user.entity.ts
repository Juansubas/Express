import TaskEntity from "./task.entity";

export default class UserEntity {

    constructor(
        public id: number ,
        public firstName: string,
        public lastName: string ,
        public userName: string,
        public email: string ,
        public password: string ,
        public phoneNumber: string ,
        public age: number,
        public dateOfBirth: Date ,
        public country: string,
        public address: string,
        public createdAt?: Date ,
        public updatedAt?: Date ,
        public tasks?: TaskEntity[]
    ){}
}