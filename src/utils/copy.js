
import { existsSync, readFileSync, writeFileSync } from 'fs';

export default function copy(src, target){
  if ( !existsSync(target) ){
    const srcBuffer = readFileSync(src);
    writeFileSync(target, srcBuffer);
  };
}