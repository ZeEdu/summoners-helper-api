import fs from 'fs';
import path from 'path';
import { Items } from '../../interfaces/Guide';
import { ItemJSON } from '../../interfaces/ItemJSON';
import getFromRawJSON from '../getFromRawJSON';

export const genItemBlock = (itemsBlock: Items[]) => {
   try {
      const parsedItems = getFromRawJSON('item') as ItemJSON;

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
