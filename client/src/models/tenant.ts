/* tslint:disable */
/* eslint-disable */
/**
 * Applifting Blog Engine
 * This OpenAPI specification describes APIs available in the Applifing Blog Engine application.  **Following APIs are exposed:** - Authentication - This API is used for login and access token acquisition - Blog - This API is a CRUD over blog entries - Comments - This API is used for comment creation and voting - Image - This API serves as an image store. It is assumed that images are uploaded during article creation. - Multitenancy - This API allows multiple blog instances to be active in a single application.  **Authorization**  All APIs except the Multitenancy API, are protected using API-KEY Token, which has either been given to the candidate during the exercise introduction or the candidate can create it themselves using the Multitenancy API `POST /tenants` endpoint. If you were already given a token, please prefer  to use it instead of creating a new one.   API-KEY Token MUST be sent like so `X-API-KEY: my-x-api-key` in the HTTP header.  Comments, Blog and Images APIs are also protected using the Access Token acquired from the `/login` EndPoint. Access Token MUST be sent like so `Authorization: my-access-token` in the HTTP header.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 
 * @export
 * @interface Tenant
 */
export interface Tenant {
    /**
     * 
     * @type {string}
     * @memberof Tenant
     */
    tenantId?: string;
    /**
     * API key to be used in the `api-key` header
     * @type {string}
     * @memberof Tenant
     */
    apiKey?: string;
    /**
     * Human readable name of the tenant
     * @type {string}
     * @memberof Tenant
     */
    name?: string;
    /**
     * Authentication password of the tenant
     * @type {string}
     * @memberof Tenant
     */
    password?: string;
    /**
     * 
     * @type {Date}
     * @memberof Tenant
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Tenant
     */
    lastUsedAt?: Date;
}