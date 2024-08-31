import { IFileService } from "../interfaces/IFileService";
import { JsonUtils } from "../utils/jsonDataUtils";

export class FileService<T> implements IFileService<T> {
    
    async readData(filePath: string): Promise<T[]> {
        return await JsonUtils.readData<T>(filePath);
    }

    async writeData(filePath: string, data: T[]): Promise<void> {
        await JsonUtils.writeData<T> (filePath, data);
    }
}
