/* tslint:disable */
/* eslint-disable */
/**
 * Underworld
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.5.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 */
export const SpellName = {
    ElectricBlast: 'electric_blast',
    GreatHeal: 'great_heal',
    Heal: 'heal',
    Phoenix: 'phoenix',
    QuickHeal: 'quick_heal',
    RagingFireball: 'raging_fireball',
    Retribution: 'retribution',
    PoisonCloud: 'poison_cloud',
    PoisonDart: 'poison_dart',
    TinyShield: 'tiny_shield'
} as const;
export type SpellName = typeof SpellName[keyof typeof SpellName];


export function SpellNameFromJSON(json: any): SpellName {
    return SpellNameFromJSONTyped(json, false);
}

export function SpellNameFromJSONTyped(json: any, ignoreDiscriminator: boolean): SpellName {
    return json as SpellName;
}

export function SpellNameToJSON(value?: SpellName | null): any {
    return value as any;
}

