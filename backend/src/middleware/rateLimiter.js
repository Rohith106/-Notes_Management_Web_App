import ratelimit from "../config/upstash.js";


const rateLimiter = async (req,res,next) => {
    try{
        const {success} = await ratelimit.limit("my-limit_key");

        if(!success){
            return res.status(429).json({
                message: "Too many requests,Try again Later"
            })
        }

        next();
    }catch(error){
        console.log("error occured in rateLimiter",error);
        next(error);
    }
}

export default rateLimiter;


