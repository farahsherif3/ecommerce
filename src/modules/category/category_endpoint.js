import {roles} from '../../middleware/auth'


const categoryEndPointes={
    create:[roles.Admin],
    update:[roles.Admin]

}

export default categoryEndPointes