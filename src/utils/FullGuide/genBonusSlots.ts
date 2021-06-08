import { BonusSlot } from '../../interfaces/BonusSlot';
import { Bonus } from '../../interfaces/Guide';
import bonusMap from './bonusMap';

export const genBonusSlots = (bonus: Bonus) => {
   try {
      return {
         slotOne: {
            name: bonusMap[bonus.slotOne as BonusSlot].name,
            icon: bonusMap[bonus.slotOne as BonusSlot].icon,
            arrKey: bonusMap[bonus.slotOne as BonusSlot].ArrayKey,
         },
         slotTwo: {
            name: bonusMap[bonus.slotTwo as BonusSlot].name,
            icon: bonusMap[bonus.slotTwo as BonusSlot].icon,
            arrKey: bonusMap[bonus.slotTwo as BonusSlot].ArrayKey,
         },
         slotThree: {
            name: bonusMap[bonus.slotThree as BonusSlot].name,
            icon: bonusMap[bonus.slotThree as BonusSlot].icon,
            arrKey: bonusMap[bonus.slotThree as BonusSlot].ArrayKey,
         },
      };
   } catch (error) {
      console.error('Error occurred:', error);
      throw new Error(error);
   }
};
