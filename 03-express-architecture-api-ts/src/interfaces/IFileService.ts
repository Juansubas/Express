export interface IFileService <T> {
    readData(filePath: string) : Promise<T []>;
    writeData(filePath: string, data: T[]) : Promise<void>;
}
