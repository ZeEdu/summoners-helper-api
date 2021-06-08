import fs from 'fs';
import path from 'path';
import { Items } from '../interfaces/Guide';
import { ItemJSON } from '../interfaces/ItemJSON';

export const genItemBlock = (itemsBlock: Items[]) => {
   try {
      const rawItemsJSON = fs.readFileSync(
         path.join(__dirname.split('src')[0], 'public/10.7.1/data/en_US/item.json'),
         'utf8'
      );
      const parsedItems: ItemJSON = JSON.parse(rawItemsJSON);

      return itemsBlock.map((block) => ({
         itemRollName: block.itemRollName,
         itemArray: block.itemArray.map((item) => ({
            name: parsedItems.data[item.item].name,
            image: parsedItems.data[item.item].image.full,
            description: parsedItems.data[item.item].description,
         })),
      }));
   } catch (error) {
      console.error('Error occurred:', error);
      throw new Error(error);
   }
};
