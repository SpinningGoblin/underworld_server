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

import { exists, mapValues } from '../runtime';
import {
    Size,
    SizeFromJSON,
    SizeFromJSONTyped,
    SizeToJSON,
} from './Size';
import {
    Species,
    SpeciesFromJSON,
    SpeciesFromJSONTyped,
    SpeciesToJSON,
} from './Species';

/**
 * 
 * @export
 * @interface GeneratePlayerCharacter
 */
export interface GeneratePlayerCharacter {
    /**
     * 
     * @type {Size}
     * @memberof GeneratePlayerCharacter
     */
    characterSize?: Size;
    /**
     * 
     * @type {Species}
     * @memberof GeneratePlayerCharacter
     */
    characterSpecies?: Species;
    /**
     * 
     * @type {string}
     * @memberof GeneratePlayerCharacter
     */
    characterName?: string;
}

export function GeneratePlayerCharacterFromJSON(json: any): GeneratePlayerCharacter {
    return GeneratePlayerCharacterFromJSONTyped(json, false);
}

export function GeneratePlayerCharacterFromJSONTyped(json: any, ignoreDiscriminator: boolean): GeneratePlayerCharacter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'characterSize': !exists(json, 'character_size') ? undefined : SizeFromJSON(json['character_size']),
        'characterSpecies': !exists(json, 'character_species') ? undefined : SpeciesFromJSON(json['character_species']),
        'characterName': !exists(json, 'character_name') ? undefined : json['character_name'],
    };
}

export function GeneratePlayerCharacterToJSON(value?: GeneratePlayerCharacter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'character_size': SizeToJSON(value.characterSize),
        'character_species': SpeciesToJSON(value.characterSpecies),
        'character_name': value.characterName,
    };
}

