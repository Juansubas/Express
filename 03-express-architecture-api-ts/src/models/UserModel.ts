export class UserModel {
    constructor(
        public id : number,
        public name: string,
        public email: string,
        public age: number,
        public active: boolean,
    ) {}
}