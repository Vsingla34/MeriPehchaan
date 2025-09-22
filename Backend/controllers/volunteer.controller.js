import {User} from '../models/user.model.js'

const getVolunteers = async (req,res)=>{
    try {
        const volunteers = await User.find({role:"volunteer"}).select(["-password","-_id","-subscribed","-email","-createdAt","-updatedAt"]);

        res.status(200).send({
            success:true,
            data:volunteers
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Internal server error",
            error
        })
    }
}

export {getVolunteers}