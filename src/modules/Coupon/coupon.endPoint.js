import {roles} from '../../middleware/auth.js'


const couponEndPointes={
    create:[roles.User],
    update:[roles.User],
    deleted:[roles.Company_HR]

}

export default couponEndPointes