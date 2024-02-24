import {roles} from '../../middleware/auth.js'


const subcategoryEndPointes={
    create:[roles.User],
    update:[roles.User],
    deleted:[roles.Company_HR]

}

export default subcategoryEndPointes