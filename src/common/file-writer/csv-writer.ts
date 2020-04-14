import { writeFile } from "fs";
import * as path from "path";
import * as process from "process";
import moment from "moment";
import { promisify } from "util";
import FileWriter from "./file-writer";

class CsvWriter implements FileWriter {
  private baseFilePath: string = path.join(process.cwd(), "quiz-result");

  async write(data: string): Promise<string> {
    const dateStamp = moment().format("DD-MM-YYYY");
    const filePath = `${this.baseFilePath}_${dateStamp}.csv`;
    await promisify(writeFile)(filePath, data);
    return filePath;
  }
}

export default CsvWriter;
