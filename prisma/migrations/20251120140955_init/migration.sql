-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ability" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonAbility" (
    "id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "ability_id" INTEGER NOT NULL,
    "is_hidden" BOOLEAN NOT NULL,

    CONSTRAINT "PokemonAbility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nature" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "increased_stat_id" INTEGER NOT NULL,
    "decreased_stat_id" INTEGER NOT NULL,

    CONSTRAINT "Nature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonNature" (
    "id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "nature_id" INTEGER NOT NULL,

    CONSTRAINT "PokemonNature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stat" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonStat" (
    "id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "stat_id" INTEGER NOT NULL,
    "base_stat" INTEGER NOT NULL,

    CONSTRAINT "PokemonStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "generation_id" INTEGER NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeEffectiveness" (
    "id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "target_type_id" INTEGER NOT NULL,
    "damage_factor" INTEGER NOT NULL,

    CONSTRAINT "TypeEffectiveness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonType" (
    "id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,

    CONSTRAINT "PokemonType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EggGroup" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EggGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonEggGroup" (
    "id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "egg_group_id" INTEGER NOT NULL,

    CONSTRAINT "PokemonEggGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generation" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "region_id" INTEGER NOT NULL,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VersionGroup" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "generation_id" INTEGER NOT NULL,

    CONSTRAINT "VersionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VersionGroupRegion" (
    "id" INTEGER NOT NULL,
    "version_group_id" INTEGER NOT NULL,
    "region_id" INTEGER NOT NULL,

    CONSTRAINT "VersionGroupRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "version_group_id" INTEGER NOT NULL,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "region_id" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationArea" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "LocationArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncounterMethod" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EncounterMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncounterSlot" (
    "id" INTEGER NOT NULL,
    "version_group_id" INTEGER NOT NULL,
    "encounter_method_id" INTEGER NOT NULL,
    "slot" INTEGER NOT NULL,
    "rarity" INTEGER NOT NULL,

    CONSTRAINT "EncounterSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encounter" (
    "id" INTEGER NOT NULL,
    "version_id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "location_area_id" INTEGER NOT NULL,
    "encounter_slot_id" INTEGER NOT NULL,
    "min_level" INTEGER NOT NULL,
    "max_level" INTEGER NOT NULL,

    CONSTRAINT "Encounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncounterCondition" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EncounterCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncounterConditionValue" (
    "id" INTEGER NOT NULL,
    "encounter_condition_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL,

    CONSTRAINT "EncounterConditionValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncounterConditionValueMap" (
    "id" INTEGER NOT NULL,
    "encounter_id" INTEGER NOT NULL,
    "encounter_condition_value_id" INTEGER NOT NULL,

    CONSTRAINT "EncounterConditionValueMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationAreaEncounterRate" (
    "id" INTEGER NOT NULL,
    "location_area_id" INTEGER NOT NULL,
    "encounter_method_id" INTEGER NOT NULL,
    "version_id" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,

    CONSTRAINT "LocationAreaEncounterRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoveDamageClass" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MoveDamageClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoveEffect" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MoveEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoveMethod" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MoveMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "generation_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "pp" INTEGER NOT NULL,
    "accuracy" INTEGER,
    "priority" INTEGER NOT NULL,
    "move_damage_class_id" INTEGER NOT NULL,
    "move_effect_id" INTEGER NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonMove" (
    "id" INTEGER NOT NULL,
    "version_group_id" INTEGER NOT NULL,
    "move_method_id" INTEGER NOT NULL,
    "move_id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "PokemonMove_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokedex" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "region_id" INTEGER NOT NULL,

    CONSTRAINT "Pokedex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokedexVersionGroup" (
    "id" INTEGER NOT NULL,
    "version_group_id" INTEGER NOT NULL,
    "pokedex_id" INTEGER NOT NULL,

    CONSTRAINT "PokedexVersionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonDexNumber" (
    "id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "pokedex_id" INTEGER NOT NULL,
    "pokedex_number" INTEGER NOT NULL,

    CONSTRAINT "PokemonDexNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Generation_region_id_key" ON "Generation"("region_id");

-- AddForeignKey
ALTER TABLE "PokemonAbility" ADD CONSTRAINT "PokemonAbility_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonAbility" ADD CONSTRAINT "PokemonAbility_ability_id_fkey" FOREIGN KEY ("ability_id") REFERENCES "Ability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nature" ADD CONSTRAINT "Nature_increased_stat_id_fkey" FOREIGN KEY ("increased_stat_id") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nature" ADD CONSTRAINT "Nature_decreased_stat_id_fkey" FOREIGN KEY ("decreased_stat_id") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonNature" ADD CONSTRAINT "PokemonNature_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonNature" ADD CONSTRAINT "PokemonNature_nature_id_fkey" FOREIGN KEY ("nature_id") REFERENCES "Nature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonStat" ADD CONSTRAINT "PokemonStat_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonStat" ADD CONSTRAINT "PokemonStat_stat_id_fkey" FOREIGN KEY ("stat_id") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "Generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeEffectiveness" ADD CONSTRAINT "TypeEffectiveness_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeEffectiveness" ADD CONSTRAINT "TypeEffectiveness_target_type_id_fkey" FOREIGN KEY ("target_type_id") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonType" ADD CONSTRAINT "PokemonType_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonType" ADD CONSTRAINT "PokemonType_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonEggGroup" ADD CONSTRAINT "PokemonEggGroup_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonEggGroup" ADD CONSTRAINT "PokemonEggGroup_egg_group_id_fkey" FOREIGN KEY ("egg_group_id") REFERENCES "EggGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionGroup" ADD CONSTRAINT "VersionGroup_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "Generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionGroupRegion" ADD CONSTRAINT "VersionGroupRegion_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionGroupRegion" ADD CONSTRAINT "VersionGroupRegion_version_group_id_fkey" FOREIGN KEY ("version_group_id") REFERENCES "VersionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_version_group_id_fkey" FOREIGN KEY ("version_group_id") REFERENCES "VersionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationArea" ADD CONSTRAINT "LocationArea_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncounterSlot" ADD CONSTRAINT "EncounterSlot_version_group_id_fkey" FOREIGN KEY ("version_group_id") REFERENCES "VersionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncounterSlot" ADD CONSTRAINT "EncounterSlot_encounter_method_id_fkey" FOREIGN KEY ("encounter_method_id") REFERENCES "EncounterMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_location_area_id_fkey" FOREIGN KEY ("location_area_id") REFERENCES "LocationArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_encounter_slot_id_fkey" FOREIGN KEY ("encounter_slot_id") REFERENCES "EncounterSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncounterConditionValue" ADD CONSTRAINT "EncounterConditionValue_encounter_condition_id_fkey" FOREIGN KEY ("encounter_condition_id") REFERENCES "EncounterCondition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncounterConditionValueMap" ADD CONSTRAINT "EncounterConditionValueMap_encounter_id_fkey" FOREIGN KEY ("encounter_id") REFERENCES "Encounter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncounterConditionValueMap" ADD CONSTRAINT "EncounterConditionValueMap_encounter_condition_value_id_fkey" FOREIGN KEY ("encounter_condition_value_id") REFERENCES "EncounterConditionValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationAreaEncounterRate" ADD CONSTRAINT "LocationAreaEncounterRate_location_area_id_fkey" FOREIGN KEY ("location_area_id") REFERENCES "LocationArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationAreaEncounterRate" ADD CONSTRAINT "LocationAreaEncounterRate_encounter_method_id_fkey" FOREIGN KEY ("encounter_method_id") REFERENCES "EncounterMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationAreaEncounterRate" ADD CONSTRAINT "LocationAreaEncounterRate_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_move_damage_class_id_fkey" FOREIGN KEY ("move_damage_class_id") REFERENCES "MoveDamageClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_move_effect_id_fkey" FOREIGN KEY ("move_effect_id") REFERENCES "MoveEffect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonMove" ADD CONSTRAINT "PokemonMove_version_group_id_fkey" FOREIGN KEY ("version_group_id") REFERENCES "VersionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonMove" ADD CONSTRAINT "PokemonMove_move_method_id_fkey" FOREIGN KEY ("move_method_id") REFERENCES "MoveMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonMove" ADD CONSTRAINT "PokemonMove_move_id_fkey" FOREIGN KEY ("move_id") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonMove" ADD CONSTRAINT "PokemonMove_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokedex" ADD CONSTRAINT "Pokedex_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokedexVersionGroup" ADD CONSTRAINT "PokedexVersionGroup_version_group_id_fkey" FOREIGN KEY ("version_group_id") REFERENCES "VersionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokedexVersionGroup" ADD CONSTRAINT "PokedexVersionGroup_pokedex_id_fkey" FOREIGN KEY ("pokedex_id") REFERENCES "Pokedex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonDexNumber" ADD CONSTRAINT "PokemonDexNumber_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonDexNumber" ADD CONSTRAINT "PokemonDexNumber_pokedex_id_fkey" FOREIGN KEY ("pokedex_id") REFERENCES "Pokedex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
