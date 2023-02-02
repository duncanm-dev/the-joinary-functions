function isAuthed( params ) {
    if (params.api_key === process.env.AUTH_KEY) return true;
    return false;
}

function throwForAuth( params ) {
    if ( !isAuthed(params) ) return {
        statusCode: 401,
        body: JSON.stringify({
            message: 'Not authorised.'
        })
    }
    return undefined
}

module.exports = {
    isAuthed,
    throwForAuth
}