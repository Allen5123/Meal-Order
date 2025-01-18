import style from "../../style/Meal/MealText.module.css";

export default function MealInput({placeholder, inputType, input, setInput}: 
                {placeholder: string, inputType: string, input: any, setInput: (text: any) => void}) {
   
    return (
            <div className={style.mealText_title}>
                <input value={input} type={inputType} placeholder={placeholder} required 
                    onChange={(e) => {setInput(e.target.value)}} min={0}></input>
            </div>
        );
}