const jwt=reuire('jsonwebtoken');

authmiddleware=(request,response,next)=>{
    try{
        const {token}=request.headers;
        if(!token){
            return response.status(401).json({message:"Unauthorized"});
        }
        const decodedToken=jwt.verify(token,'itm');
        if(!decodedToken){
            return response.status(401).json({message:"Token is invalid"});
        }
        request.user=decodedToken;

        next();
    }
    catch(error){
        response.status(401).json({message:'Unauthorized'});
    }
}
module.exports=authMiddleWare;