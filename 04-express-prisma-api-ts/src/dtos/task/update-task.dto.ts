export class UpdateTaskDto {
    constructor(
        public id: number,
        public title?: string,
        public content?: string,
        public complete?: boolean,
        public dueDate?: Date
    ) {}
}
