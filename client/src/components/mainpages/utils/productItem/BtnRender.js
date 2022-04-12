import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({product}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin 
    const addCart = state.userAPI.addCart

    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    
                    <Link id="btn_view1" to={`/edit_product/${product._id}`}><button class="custom-btnn btn-8"><span>Edit</span></button>
                        
                    

                    </Link>
                    
                </>
                : <>
                    <Link id="btn_buy" to="#!" onClick={() => addCart(product)}><button class="custom-btn btn-9">Buy</button>
                        
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`}><button class="custom-btn btn-7"><span>View</span></button>
                        
                    </Link>
                </>
                
            }
                
        </div>
    )
}

export default BtnRender