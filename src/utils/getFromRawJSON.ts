import fs from 'fs';
import path from 'path';

const getFromRawJSON = (file: string) => {
   const rawItemsJSON = fs.readFileSync(
      path.join(
         __dirname.split('src')[0].split('dist')[0],
         `public/10.7.1/data/en_US/${file}.json`
      ),
      'utf8'
   );
   return JSON.parse(rawItemsJSON);
};

export default getFromRawJSON;
