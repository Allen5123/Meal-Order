import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import style from "../../style/LoginSignUp/LoginSignUpForm.module.css";
import { BACKEND_URL } from '../../constant';
import type { SignUpInput } from "../../type";

function InputImgField({ img, handleImgChange }: { img?: File, handleImgChange: React.ChangeEventHandler<HTMLInputElement> }) {
    const inputImgref = useRef<HTMLInputElement>(null);
    const handleImgClick = (e: React.MouseEvent): void => {
        e.preventDefault();
        inputImgref.current?.click();
    }
    return (
        <div>
            <input style={{ display: "none" }} ref={inputImgref} type="file" onChange={handleImgChange} />
            {img ? <img src={URL.createObjectURL(img)} onClick={handleImgClick} /> : <div onClick={handleImgClick}>請上傳餐廳圖片</div>}
        </div>
    )
}

export default function SignUpForm({ identity, handleActive }: { identity: "customer" | "vendor", handleActive: (e: React.MouseEvent) => void }) {
    const text = identity === "customer" ? "顧客註冊" : "商家註冊";
    const [userInput, setUserInput] = useState<SignUpInput>({
        email: "",
        password: "",
        name: ""
    });
    const [error, setError] = useState<Boolean>(false);
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<number | undefined> => {
        e.preventDefault();
        const url = `${BACKEND_URL}/signup`;
        const formData = new FormData();
        formData.append("data", JSON.stringify({ ...userInput, identity: identity }));
        if (userInput.img) formData.append("img", userInput.img);
        const res = await fetch(url, {
            method: "POST",
            body: formData
        }).then((res) => { return res.json(); });
        return new Promise((resolve, reject) => {
            if (res !== null) resolve(res.id);
            else reject();
        });
    }

    return (
        <form className={identity === "customer" ?
            `${style.LoginForm} ${style.customer}` :
            `${style.LoginForm} ${style.vendor}`} onSubmit={async (e) => {
                try {
                    const id = await handleSubmit(e);
                    navigate(`/${identity}/${id}`);
                } catch (error) {
                    setError(true);
                }
            }}>
            <h1> {text} </h1>
            <label>
                <input type="email" name="account" placeholder="Email" onChange={e => setUserInput({ ...userInput, email: e.currentTarget.value })} />
            </label>
            <label>
                <input type="text" name="name" placeholder="Name" onChange={e => setUserInput({ ...userInput, name: e.currentTarget.value })} />
            </label>
            {identity === "vendor" && <label>
                <input type="text" name="address" placeholder="Address" onChange={e => setUserInput({ ...userInput, address: e.currentTarget.value })} />
            </label>}
            <label>
                <input type="password" name="password" placeholder="Password" onChange={e => setUserInput({ ...userInput, password: e.currentTarget.value })} />
            </label>
            {identity === "vendor" && <select name="type" required={true} onChange={e => setUserInput({ ...userInput, type: e.currentTarget.value })}>
                <option value="">請選擇餐廳類型</option>
                <option value="台灣美食">台灣美食</option>
                <option value="中式美食">中式美食</option>
                <option value="美式料理">美式料理</option>
                <option value="義大利美食">義大利美食</option>
                <option value="日本美食">日本美食</option>
                <option value="韓國美食">韓國美食</option>
                <option value="泰國美食">泰國美食</option>
                <option value="港式美食">港式美食</option>
                <option value="純素料理">純素料理</option>
                <option value="其他異國料理">其他異國料理</option>
                <option value="速食">速食</option>
                <option value="飲料">飲料</option>
                <option value="點心">點心</option>
            </select>}
            {identity === "vendor" && <InputImgField img={userInput.img} handleImgChange={e => {
                if (e.currentTarget.files) setUserInput({ ...userInput, img: e.currentTarget.files[0] });
            }} />}
            {error && <h3 className={style.errormsg}> Email 已存在 </h3>}
            <input className={style.submitbtn} type="submit" value="Submit" />
            <button type="button" className={style.changebtn} onClick={handleActive}>{identity === "customer" ? "我是商家" : "我是顧客"}</button>
        </form>
    );
}