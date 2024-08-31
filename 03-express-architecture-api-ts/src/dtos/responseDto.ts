export interface responseDto <T> {
    result : T | T[] ;
    message : string;
    status : string 
}