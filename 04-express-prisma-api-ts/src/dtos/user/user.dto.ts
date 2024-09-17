export class UserDto {
    constructor(
        public id : number,
        public firstName: string,
        public lastName: string,
        public userName: string,
        public email: string,
        public phoneNumber: string,
        public age: number,
        public dateOfBirth: Date,
        public country: string,
        public address: string,
        public createdAt: Date | void,
        public updatedAt: Date | void,
    ) {}
}
