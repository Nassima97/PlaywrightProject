import fs from 'fs';

export function readDataFromJson(filePath: string): any {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}