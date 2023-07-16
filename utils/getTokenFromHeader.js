export const getTokenFromHeader = (req) => {
    const headerObj = req?.headers?.authorization?.split(" ");
    const token = headerObj[1]
    if(token==undefined){
        return 'No token found'
    }
    return token
}