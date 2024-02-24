import {roles} from '../../middleware/auth.js'


const cartEndPointes={
    create:[roles.Admin],
    update:[roles.User],
    delete:[roles.User]

}

export default cartEndPointes