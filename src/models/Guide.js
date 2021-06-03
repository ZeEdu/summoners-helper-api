class Guide {
   constructor(
      createdOn,
      updatedOn,
      name,
      champion,
      role,
      runes,
      runesDescription,
      bonus,
      bonusDescription,
      spells,
      spellsDescription,
      itemsBlock,
      itemsDescription,
      abilitiesProgression,
      abilitiesProgressionDescription,
      threats,
      introduction,
      userUID,
      patch,
      _id
   ) {
      this.createdOn = createdOn;
      this.updatedOn = updatedOn;
      this.name = name;
      this.champion = champion;
      this.role = role;
      this.runes = runes;
      this.runesDescription = runesDescription;
      this.bonus = bonus;
      this.bonusDescription = bonusDescription;
      this.spells = spells;
      this.spellsDescription = spellsDescription;
      this.itemsBlock = itemsBlock;
      this.itemsDescription = itemsDescription;
      this.abilitiesProgression = abilitiesProgression;
      this.abilitiesProgressionDescription = abilitiesProgressionDescription;
      this.threats = threats;
      this.introduction = introduction;
      this.userUID = userUID;
      this.patch = patch;
      this._id = _id;
   }
}

module.exports = Guide;
