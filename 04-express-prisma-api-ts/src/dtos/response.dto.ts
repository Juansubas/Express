import { ResponseStatus } from "../enums/ResponseStatus";

export class ResponseDto <T> {
    constructor(
        public Data : T,
        public Message: string,
        public Status : ResponseStatus
    ){}
}