export default class TaskEntity {

    constructor(
        public id: number, 
        public userId: number,
        public title: string,
        public content: string,
        public complete: boolean,
        public date: Date,
        public dueDate: Date,
    ) {}
}