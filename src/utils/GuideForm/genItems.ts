import { ItemJSON } from '../../interfaces/ItemJSON';
import getFromRawJSON from '../getFromRawJSON';

const genItems = () => {
   const data = getFromRawJSON('item') as ItemJSON;

   return Object.values(data.data).map((el) => ({
      id: el.image.full.replace('.png', ''),
      name: el.name,
   }));
};

export default genItems;
