export class UpdateTaskDto {
    constructor(
        public title?: string,
        public content?: string,
        public complete?: boolean,
        public dueDate?: Date
    ) {}
}
