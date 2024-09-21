export class UpdateUserDto {
    constructor(
        public firstName?: string,
        public lastName?: string,
        public userName?: string,
        public email?: string,
        public password?: string ,
        public phoneNumber?: string,
        public age?: number,
        public dateOfBirth?: Date,
        public country?: string,
        public address?: string
    ) {}
}
