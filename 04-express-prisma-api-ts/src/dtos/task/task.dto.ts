export default class TaskDto {

    constructor(
        public id: number, 
        public userId: number,
        public title: string,
        public content: string,
        public complete: boolean,
        public date: Date,
        public dueDate?: Date | null,
    ) {}
}