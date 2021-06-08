import fs from 'fs';
import path from 'path';
import { Runes } from '../interfaces/Guide';
import { Rune, RunesReforged } from '../interfaces/RunesReforgedJSON';

export const genRunes = (runes: Runes) => {
   try {
      const rawRunes = fs.readFileSync(
         path.join(__dirname.split('src')[0], 'public/10.7.1/data/en_US/runesReforged.json'),
         'utf8'
      );
      const parsedRunes: RunesReforged[] = JSON.parse(rawRunes);

      const primaryRune = parsedRunes.find((item) => item.key === runes.primaryRune);
      const secondaryRune = parsedRunes.find((item) => item.key === runes.secondaryRune);
      let allPrimaryRunes: Rune[] = [];
      let allSecondaryRunes: Rune[] = [];

      if (primaryRune) {
         primaryRune.slots.forEach((item) => {
            allPrimaryRunes = [...allPrimaryRunes, ...item.runes];
         });
      }

      if (secondaryRune) {
         secondaryRune.slots.forEach((item) => {
            allSecondaryRunes = [...allSecondaryRunes, ...item.runes];
         });
      }

      const primaryRunesObj: { [key: string]: Rune } = allPrimaryRunes.reduce(
         (obj, item) => ({ ...obj, [item['key']]: item }),
         {}
      );

      const secondaryRunesObj: { [key: string]: Rune } = allSecondaryRunes.reduce(
         (obj, item) => ({ ...obj, [item['key']]: item }),
         {}
      );
      if (runes.primarySlots.fourth) {
         return {
            primaryRune: runes.primaryRune,
            primarySlots: {
               first: {
                  name: primaryRunesObj[runes.primarySlots.first].name,
                  icon: primaryRunesObj[runes.primarySlots.first].icon,
                  description: primaryRunesObj[runes.primarySlots.first].longDesc,
               },
               second: {
                  name: primaryRunesObj[runes.primarySlots.second].name,
                  icon: primaryRunesObj[runes.primarySlots.second].icon,
                  description: primaryRunesObj[runes.primarySlots.second].longDesc,
               },
               third: {
                  name: primaryRunesObj[runes.primarySlots.third].name,
                  icon: primaryRunesObj[runes.primarySlots.third].icon,
                  description: primaryRunesObj[runes.primarySlots.third].longDesc,
               },
               fourth: {
                  name: primaryRunesObj[runes.primarySlots.fourth].name,
                  icon: primaryRunesObj[runes.primarySlots.fourth].icon,
                  description: primaryRunesObj[runes.primarySlots.fourth].longDesc,
               },
            },
            secondaryRune: runes.secondaryRune,
            secondarySlots: {
               first: {
                  name: secondaryRunesObj[runes.secondarySlots.first].name,
                  icon: secondaryRunesObj[runes.secondarySlots.first].icon,
                  description: secondaryRunesObj[runes.secondarySlots.first].longDesc,
               },
               second: {
                  name: secondaryRunesObj[runes.secondarySlots.second].name,
                  icon: secondaryRunesObj[runes.secondarySlots.second].icon,
                  description: secondaryRunesObj[runes.secondarySlots.second].longDesc,
               },
               third: {
                  name: secondaryRunesObj[runes.secondarySlots.third].name,
                  icon: secondaryRunesObj[runes.secondarySlots.third].icon,
                  description: secondaryRunesObj[runes.secondarySlots.third].longDesc,
               },
            },
         };
      } else {
         throw new Error('Error while parsing runes');
      }
   } catch (error) {
      console.error('Error occurred while removig the guide', error);
      throw new Error('Error occurred');
   }
};
