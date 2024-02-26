import {roles} from '../../middleware/auth.js'


const orderEndPointes={
    create:[roles.User],
    cancel:[roles.User],
    reject:[roles.Admin],
    delvire:[roles.Admin]
  
}

export default orderEndPointes