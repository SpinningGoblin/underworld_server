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
    Consumable,
    ConsumableFromJSON,
    ConsumableFromJSONTyped,
    ConsumableToJSON,
} from './Consumable';
import {
    Defense,
    DefenseFromJSON,
    DefenseFromJSONTyped,
    DefenseToJSON,
} from './Defense';
import {
    Identifier,
    IdentifierFromJSON,
    IdentifierFromJSONTyped,
    IdentifierToJSON,
} from './Identifier';
import {
    ItemDescriptor,
    ItemDescriptorFromJSON,
    ItemDescriptorFromJSONTyped,
    ItemDescriptorToJSON,
} from './ItemDescriptor';
import {
    ItemType,
    ItemTypeFromJSON,
    ItemTypeFromJSONTyped,
    ItemTypeToJSON,
} from './ItemType';
import {
    Material,
    MaterialFromJSON,
    MaterialFromJSONTyped,
    MaterialToJSON,
} from './Material';
import {
    Tag,
    TagFromJSON,
    TagFromJSONTyped,
    TagToJSON,
} from './Tag';

/**
 * 
 * @export
 * @interface Item
 */
export interface Item {
    /**
     * 
     * @type {Identifier}
     * @memberof Item
     */
    identifier: Identifier;
    /**
     * 
     * @type {ItemType}
     * @memberof Item
     */
    itemType: ItemType;
    /**
     * 
     * @type {Array<Tag>}
     * @memberof Item
     */
    tags: Array<Tag>;
    /**
     * 
     * @type {Array<ItemDescriptor>}
     * @memberof Item
     */
    descriptors: Array<ItemDescriptor>;
    /**
     * 
     * @type {boolean}
     * @memberof Item
     */
    descriptorsKnown: boolean;
    /**
     * 
     * @type {Material}
     * @memberof Item
     */
    material?: Material;
    /**
     * 
     * @type {boolean}
     * @memberof Item
     */
    materialKnown: boolean;
    /**
     * 
     * @type {Attack}
     * @memberof Item
     */
    attack?: Attack;
    /**
     * 
     * @type {boolean}
     * @memberof Item
     */
    attackKnown: boolean;
    /**
     * 
     * @type {Defense}
     * @memberof Item
     */
    defense?: Defense;
    /**
     * 
     * @type {boolean}
     * @memberof Item
     */
    defenseKnown: boolean;
    /**
     * 
     * @type {Consumable}
     * @memberof Item
     */
    consumable?: Consumable;
    /**
     * 
     * @type {boolean}
     * @memberof Item
     */
    knowsConsumable: boolean;
}

export function ItemFromJSON(json: any): Item {
    return ItemFromJSONTyped(json, false);
}

export function ItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): Item {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'identifier': IdentifierFromJSON(json['identifier']),
        'itemType': ItemTypeFromJSON(json['item_type']),
        'tags': ((json['tags'] as Array<any>).map(TagFromJSON)),
        'descriptors': ((json['descriptors'] as Array<any>).map(ItemDescriptorFromJSON)),
        'descriptorsKnown': json['descriptors_known'],
        'material': !exists(json, 'material') ? undefined : MaterialFromJSON(json['material']),
        'materialKnown': json['material_known'],
        'attack': !exists(json, 'attack') ? undefined : AttackFromJSON(json['attack']),
        'attackKnown': json['attack_known'],
        'defense': !exists(json, 'defense') ? undefined : DefenseFromJSON(json['defense']),
        'defenseKnown': json['defense_known'],
        'consumable': !exists(json, 'consumable') ? undefined : ConsumableFromJSON(json['consumable']),
        'knowsConsumable': json['knows_consumable'],
    };
}

export function ItemToJSON(value?: Item | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'identifier': IdentifierToJSON(value.identifier),
        'item_type': ItemTypeToJSON(value.itemType),
        'tags': ((value.tags as Array<any>).map(TagToJSON)),
        'descriptors': ((value.descriptors as Array<any>).map(ItemDescriptorToJSON)),
        'descriptors_known': value.descriptorsKnown,
        'material': MaterialToJSON(value.material),
        'material_known': value.materialKnown,
        'attack': AttackToJSON(value.attack),
        'attack_known': value.attackKnown,
        'defense': DefenseToJSON(value.defense),
        'defense_known': value.defenseKnown,
        'consumable': ConsumableToJSON(value.consumable),
        'knows_consumable': value.knowsConsumable,
    };
}

