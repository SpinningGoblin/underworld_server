/* tslint:disable */
/* eslint-disable */
/**
 * Underworld
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.2.0
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
export const EquipLocationTag = {
    Ankle: 'ankle',
    Arm: 'arm',
    Back: 'back',
    Body: 'body',
    Face: 'face',
    Feet: 'feet',
    Hand: 'hand',
    Head: 'head',
    Hip: 'hip',
    HipSheath: 'hip_sheath',
    Leg: 'leg',
    Neck: 'neck',
    Packed: 'packed',
    Pockets: 'pockets',
    Shoulder: 'shoulder',
    Waist: 'waist',
    Wrist: 'wrist'
} as const;
export type EquipLocationTag = typeof EquipLocationTag[keyof typeof EquipLocationTag];


export function EquipLocationTagFromJSON(json: any): EquipLocationTag {
    return EquipLocationTagFromJSONTyped(json, false);
}

export function EquipLocationTagFromJSONTyped(json: any, ignoreDiscriminator: boolean): EquipLocationTag {
    return json as EquipLocationTag;
}

export function EquipLocationTagToJSON(value?: EquipLocationTag | null): any {
    return value as any;
}

