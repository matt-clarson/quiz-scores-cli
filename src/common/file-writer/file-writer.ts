interface FileWriter {
  write: (data: string) => Promise<void>;
}

export default FileWriter;
