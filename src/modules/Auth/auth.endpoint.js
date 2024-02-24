import {roles} from '../../middleware/auth.js'


const UserEndPointes={
    create:[roles.User],
    update:[roles.User],
    deleted:[roles.Company_HR]

}

export default UserEndPointes