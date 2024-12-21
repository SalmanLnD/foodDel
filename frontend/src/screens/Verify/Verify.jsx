import {useContext,useEffect} from 'react'
import './Verify.css'
import {StoreContext} from '../../Context/StoreContext'
import {useSearchParams,useNavigate} from 'react-router-dom'
import axios from "axios"

const verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();

    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    console.log(success,orderId)
    const {url} = useContext(StoreContext)

    const navigate = useNavigate()
    const verifyPayment = async()=>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
        if(response.data.success){
            navigate("/myorders")
        }else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default verify