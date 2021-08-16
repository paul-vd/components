export const installerError = ( msg: string ): never => {
    throw new Error( `impossible to install TwicPics: ${ msg }` );
}

export const isBrowser: boolean =
    Boolean( ( typeof document !== `undefined` ) && document.createElement && document.head );
