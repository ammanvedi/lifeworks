export class BalanceFetchError extends Error {
    constructor( message, url ) {
        super( `Error: ${ message }, fetching ${ url }` );
    }
}