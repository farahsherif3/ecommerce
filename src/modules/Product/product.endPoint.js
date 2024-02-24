import {roles} from '../../middleware/auth.js'


const ProductEndPointes={
    create:[roles.Admin],
    update:[roles.User],
    deleted:[roles.Company_HR]

}

export default ProductEndPointes