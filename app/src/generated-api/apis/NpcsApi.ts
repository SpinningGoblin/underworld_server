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


import * as runtime from '../runtime';
import {
    GeneratedNpc,
    GeneratedNpcFromJSON,
    GeneratedNpcToJSON,
} from '../models';

/**
 * NpcsApi - interface
 * 
 * @export
 * @interface NpcsApiInterface
 */
export interface NpcsApiInterface {
    /**
     * # Example  Call `/npc/random` to generate a completely random character
     * @summary Generate a random NPC.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NpcsApiInterface
     */
    getRandomNpcRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GeneratedNpc>>;

    /**
     * # Example  Call `/npc/random` to generate a completely random character
     * Generate a random NPC.
     */
    getRandomNpc(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GeneratedNpc>;

}

/**
 * 
 */
export class NpcsApi extends runtime.BaseAPI implements NpcsApiInterface {

    /**
     * # Example  Call `/npc/random` to generate a completely random character
     * Generate a random NPC.
     */
    async getRandomNpcRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GeneratedNpc>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/npc/random`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GeneratedNpcFromJSON(jsonValue));
    }

    /**
     * # Example  Call `/npc/random` to generate a completely random character
     * Generate a random NPC.
     */
    async getRandomNpc(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GeneratedNpc> {
        const response = await this.getRandomNpcRaw(initOverrides);
        return await response.value();
    }

}
