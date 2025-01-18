import type { Meal } from '../../type'
import style from '../../style/Meal/AllMealAddMealItem.module.css'
import Counter from '../shared/Counter'
import { BACKEND_URL } from '../../constant'
import { useEffect, useState, useRef } from 'react'
import AddMealButton from './AddMealButton'
import MealText from './MealText';
import { GrAdd } from "react-icons/gr"
import { useParams } from 'react-router-dom'

function InputImgField({ img, handleImgChange }: { img?: File, handleImgChange: React.ChangeEventHandler<HTMLInputElement> }) {
  const inputImgref = useRef<HTMLInputElement>(null);
  const handleImgClick = (e: React.MouseEvent): void => {
      e.preventDefault();
      inputImgref.current?.click();
  }
  return (
      <div>
          <input style={{ display: "none" }} ref={inputImgref} type="file" onChange={handleImgChange} />
          {img ? <img src={URL.createObjectURL(img)} onClick={handleImgClick}  style={{ width: '100%', height: '100%', objectFit: 'cover' }}/> : <GrAdd onClick={handleImgClick}/>}
      </div>
  )
}

const UploadNewMeal = async (newMeal: Meal, img: any, setMeals: any) => {
  const update_url = `${BACKEND_URL}/allMeals/addMealItem`;
      const formData = new FormData();
      formData.append("data", JSON.stringify({ ...newMeal }));
      formData.append("img", img);
      const res = await fetch(update_url, {
          method: "POST",
          body: formData
      }).then((res) => { return res.json(); });
      setMeals((prevMeals: any) => [...prevMeals, {...newMeal, ...res}]);
}

export default function AllMealAddMealItem({setMeals}: {setMeals: React.Dispatch<React.SetStateAction<Meal[]>>}) {
  const vendorId = useParams().vendorId;
  const [count, setCount] = useState(0);
  const [image, setImages] = useState<File>();
  const [newMealName, setNewMealName] = useState<string>();
  const [newMealPrice, setNewMealPrice] = useState<string>("");
  
  const addMealOnClick = async () => {
    // Check data validity
    if (typeof newMealName === "undefined")
      alert("餐點名稱不能為空");
    else if (typeof newMealPrice === "undefined")
      alert("餐點價格不能為空");
    else if (Number(newMealPrice) < 0)
      alert("餐點價錢不能為負");
    else if (count <= 0)
      alert("預設庫存不得小於1");
    else if (image === undefined)
      alert("餐點圖片不能為空");
    else {
      let inventory: Record<string, number> = {};
      for (let i = 1; i <= 7; i++){
        inventory[i.toString()] = count;
      }

      const newMeal: Meal = {
        Meal_ID: -1,
        Vendor_ID: Number(vendorId),
        Meal_Name: newMealName,
        Description: "",
        Price: Number(newMealPrice),
        Inventory: inventory,
        Image_url: '',
        Default_Inventory: count
      };
      await UploadNewMeal(newMeal, image, setMeals);
      setCount(0);
      setImages(undefined);
      setNewMealName("");
      setNewMealPrice("");
    }
  }

  return (
    <div className={style.addMealItem_item}>
      <div className={style.addMealItem_attributeContainer}>
        <div className={style.addMealItem_mealContainer}>
          <div className={style.addMealItem_contentContainer}>
            <div className={style.mealText_title}>
                  <input value={newMealName} placeholder={"餐點名稱"} type="string" required 
                      onChange={(e) => {setNewMealName(e.target.value)}}></input>
            </div>
            <div className={style.mealText_title}>
                  <input value={newMealPrice} placeholder={"餐點價格"} type="number" required 
                      onChange={(e) => {setNewMealPrice(e.target.value)}}></input>
            </div>
          </div>

          <div className={style.addMealItem_otherContainer}>
            <div className={style.addMealItem_counterBox}>
              <div className={style.addMealItem_counter}>
                <Counter count={count} setCount={setCount} />
              </div>
              <div className={style.addMealItem_counterDescription}>預設庫存：</div>
            </div>
          </div>
        </div>

        <div className={style.addMealItem_buttonContainer}>
          <AddMealButton text="新增餐點" onClickFunc={() => {addMealOnClick()}}/>
        </div>
      </div>
      <div className={style.addMealItem_imgBox}>
          <InputImgField img={image} handleImgChange={(e) => {setImages(e.target.files?.[0])}}/>
      </div>

    </div>
  );
}