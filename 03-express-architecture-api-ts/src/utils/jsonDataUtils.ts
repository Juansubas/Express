import { promises as fs } from 'fs';

export class JsonUtils {
    public static async readData<T>(filePath: string): Promise<T[]> {
        try {
            const json = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(json) as T[];
        } catch (error) {
            console.error('Error reading data:', error);
            throw new Error('Error reading data');
            return [];
        }
    }

    public static async writeData<T>(filePath: string, data: T[]): Promise<void> {
        try {
            const json = JSON.stringify(data, null, 2); 
            await fs.writeFile(filePath, json, 'utf-8');
        } catch (error) {
            console.error('Error writing data:', error);
            throw new Error('Error writing data');
        }
    }
}
