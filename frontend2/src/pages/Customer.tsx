import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BACKEND_URL } from '../constant';
import VendorBlock from '../components/VendorHomepage/VendorBlock'
import style1 from '../style/CustomerHomepage/DropDown.module.css';
import style2 from "../style/CustomerHomepage/CustomerSearch.module.css";
import style3 from "../style/CustomerHomepage/SearchLine.module.css";

export type Vendors = {
    Image_url: string,
    Name: string,
    Address: string
    Vendor_ID: number;
};

export default function Customer() {
    const params = useParams();
    const id = params.customerId;
    const [vendorType, setVendorType] = useState("所有類型");
    const [vendors, setVendors] = useState<Vendors[]>([]);
    const [searchResultLine, setSearchResultLine] = useState("");
    const [searchInput, setSearchInput] = useState('');
    const vendortypelist: string[] = ["所有類型", "台灣美食", "日本美食", "中式美食", "美式料理", "義大利美食", "韓國美食", "泰國美食", "港式美食", "純素料理", "其他異國料理", "速食", "飲料", "點心"]

    useEffect(() => {
        const FetchVendors = async (ID: string, vendortype: string, searchinput: string) => {
            try {
                const url: string = `${BACKEND_URL}/customer?id=${ID}&vendortype=${vendortype}&searchinput=${searchinput}`;
                const result = await fetch(url).then((res) => { return res.json(); });
                setVendors(result);
                if (searchinput == ""){
                    setSearchResultLine("");
                }
                else{
                    setSearchResultLine(`${result.length}筆結果符合在"`+vendorType+`"搜尋"`+searchInput+`"`);
                }
            }
            catch (err) {
                throw err;
            }
        }

        const abortController = new AbortController();
        FetchVendors(id!, vendorType, searchInput);
        
        return () => {
            abortController.abort();
        }
    }, [vendorType, searchInput, id]);

    return (
        <>
            {/* searchbox */}
            <div className={style2.wrap}>
                <div className={style2.searchBox}>
                    <input type="text" className={style2.searchTerm} placeholder="搜尋餐廳" onChange={e => setSearchInput(e.target.value)}/>
                    <div className={style2.searchIcon}>
                        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"/>
                        <i className ="fa fa-search"></i>
                    </div>
                </div>
            </div>

            {/* <SearchResultLine result_cnt={vendors.length} vendorType={vendorType} searchInput={searchInput} />             */}
            <div className={style3.searchLine}>
                {searchResultLine}
            </div>

            {/* vendorTypeFilter */}
            <select 
                value={vendorType}
                className={style1.DropDown}
                onChange={e=>{setVendorType(e.target.value);}}>
                {vendortypelist.map(v => (<option value={v} key={v}> {v} </option>))}
            </select>

            {/* vendorBlocks */}
            <div className='VendorBlocks'>
                {vendors.map(e=>{return <VendorBlock key={e.Vendor_ID} imgurl={e.Image_url} name={e.Name} addr={e.Address} vid={e.Vendor_ID}/>})}
            </div>
        </>
    );
}