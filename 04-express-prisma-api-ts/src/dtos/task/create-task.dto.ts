export class CreateTaskDto {
    constructor(
        public title: string,
        public content: string,
        public dueDate?: Date
    ) {}
}
