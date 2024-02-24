import {roles} from '../../middleware/auth.js'


const BrandEndPointes={
    create:[roles.User],
    update:[roles.User],
    deleted:[roles.Company_HR]

}

export default BrandEndPointes