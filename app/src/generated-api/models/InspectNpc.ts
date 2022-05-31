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
/**
 * Inspect an NPC, with a chance to reveal more information
 * than was previously known about the NPC.
 * @export
 * @interface InspectNpc
 */
export interface InspectNpc {
    /**
     * 
     * @type {string}
     * @memberof InspectNpc
     */
    npcId: string;
    /**
     * Attempt to discover the NPC's health.
     * @type {boolean}
     * @memberof InspectNpc
     */
    discoverHealth: boolean;
    /**
     * Attempt to discover the NPC's name.
     * @type {boolean}
     * @memberof InspectNpc
     */
    discoverName: boolean;
    /**
     * Attempt to discover the items the NPC has packed away.
     * @type {boolean}
     * @memberof InspectNpc
     */
    discoverPackedItems: boolean;
    /**
     * Attempt to discover any hidden items the NPC has.
     * @type {boolean}
     * @memberof InspectNpc
     */
    discoverHiddenItems: boolean;
}

export function InspectNpcFromJSON(json: any): InspectNpc {
    return InspectNpcFromJSONTyped(json, false);
}

export function InspectNpcFromJSONTyped(json: any, ignoreDiscriminator: boolean): InspectNpc {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'npcId': json['npc_id'],
        'discoverHealth': json['discover_health'],
        'discoverName': json['discover_name'],
        'discoverPackedItems': json['discover_packed_items'],
        'discoverHiddenItems': json['discover_hidden_items'],
    };
}

export function InspectNpcToJSON(value?: InspectNpc | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'npc_id': value.npcId,
        'discover_health': value.discoverHealth,
        'discover_name': value.discoverName,
        'discover_packed_items': value.discoverPackedItems,
        'discover_hidden_items': value.discoverHiddenItems,
    };
}

