import { ResponseStatus } from "../enums/response-status.enum";

export class ResponseDto <T> {
    constructor(
        public Data : T,
        public Message: string,
        public Status : ResponseStatus
    ){}
}