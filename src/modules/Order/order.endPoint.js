import {roles} from '../../middleware/auth.js'


const orderEndPointes={
    create:[roles.User],
    cancel:[roles.User],
    delvire:[roles.Admin]
  
}

export default orderEndPointes