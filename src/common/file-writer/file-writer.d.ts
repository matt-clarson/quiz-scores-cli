interface FileWriter {
  write: (data: string) => Promise<string>;
}

export default FileWriter;
