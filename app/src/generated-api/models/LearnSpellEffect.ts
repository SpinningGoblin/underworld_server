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
    Attack,
    AttackFromJSON,
    AttackFromJSONTyped,
    AttackToJSON,
} from './Attack';
import {
    Defense,
    DefenseFromJSON,
    DefenseFromJSONTyped,
    DefenseToJSON,
} from './Defense';
import {
    SpellName,
    SpellNameFromJSON,
    SpellNameFromJSONTyped,
    SpellNameToJSON,
} from './SpellName';

/**
 * 
 * @export
 * @interface LearnSpellEffect
 */
export interface LearnSpellEffect {
    /**
     * 
     * @type {SpellName}
     * @memberof LearnSpellEffect
     */
    spellName: SpellName;
    /**
     * 
     * @type {Attack}
     * @memberof LearnSpellEffect
     */
    spellAttack?: Attack;
    /**
     * 
     * @type {Defense}
     * @memberof LearnSpellEffect
     */
    spellDefense?: Defense;
    /**
     * 
     * @type {number}
     * @memberof LearnSpellEffect
     */
    spellUses: number;
}

export function LearnSpellEffectFromJSON(json: any): LearnSpellEffect {
    return LearnSpellEffectFromJSONTyped(json, false);
}

export function LearnSpellEffectFromJSONTyped(json: any, ignoreDiscriminator: boolean): LearnSpellEffect {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'spellName': SpellNameFromJSON(json['spell_name']),
        'spellAttack': !exists(json, 'spell_attack') ? undefined : AttackFromJSON(json['spell_attack']),
        'spellDefense': !exists(json, 'spell_defense') ? undefined : DefenseFromJSON(json['spell_defense']),
        'spellUses': json['spell_uses'],
    };
}

export function LearnSpellEffectToJSON(value?: LearnSpellEffect | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'spell_name': SpellNameToJSON(value.spellName),
        'spell_attack': AttackToJSON(value.spellAttack),
        'spell_defense': DefenseToJSON(value.spellDefense),
        'spell_uses': value.spellUses,
    };
}
