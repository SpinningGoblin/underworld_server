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
 * 
 * @export
 * @interface LootFixture
 */
export interface LootFixture {
    /**
     * 
     * @type {string}
     * @memberof LootFixture
     */
    fixtureId: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof LootFixture
     */
    itemIds: Array<string>;
}

export function LootFixtureFromJSON(json: any): LootFixture {
    return LootFixtureFromJSONTyped(json, false);
}

export function LootFixtureFromJSONTyped(json: any, ignoreDiscriminator: boolean): LootFixture {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fixtureId': json['fixture_id'],
        'itemIds': json['item_ids'],
    };
}

export function LootFixtureToJSON(value?: LootFixture | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'fixture_id': value.fixtureId,
        'item_ids': value.itemIds,
    };
}

