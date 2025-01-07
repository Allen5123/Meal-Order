import { Link } from "react-router-dom";
import style from "../../style/CustomerHomepage/VendorBlock.module.css";

export default function VendorBlock({imgurl, name, addr, vid}:{imgurl:string, name:string, addr:string, vid:number}){
    return(
        <Link to={`vendor/${vid}`}>
            <button type="submit" className={style.VendorBlock}>
                <div className={style.VendorImg}>
                    <img src={imgurl} alt='error'></img>
                </div>
                <div className={style.VendorInfo}> 
                    <h1 className={style.VendorName}>{name}</h1>
                    <h4 className={style.VendorAddr}>{addr}</h4>
                </div>

            </button>
        </Link>
    );
};