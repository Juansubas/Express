export class CreateTaskDto {
    constructor(
        public userId: number, 
        public title: string,
        public content: string,
        public dueDate?: Date
    ) {}
}
