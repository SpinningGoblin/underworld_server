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
export const Size = {
    Average: 'average',
    Huge: 'huge',
    Large: 'large',
    Massive: 'massive',
    Long: 'long',
    Medium: 'medium',
    Narrow: 'narrow',
    Short: 'short',
    Small: 'small',
    Squat: 'squat',
    Tall: 'tall',
    Tiny: 'tiny',
    Wide: 'wide'
} as const;
export type Size = typeof Size[keyof typeof Size];


export function SizeFromJSON(json: any): Size {
    return SizeFromJSONTyped(json, false);
}

export function SizeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Size {
    return json as Size;
}

export function SizeToJSON(value?: Size | null): any {
    return value as any;
}

