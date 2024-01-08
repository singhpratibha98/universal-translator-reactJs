import React, { useState } from 'react'
import languageList from "./Language.json";
import "./Translator.css";

export default function Translator() {

    const [InputText , setInputText] = useState('');
    const [Inputformat , setInputFormat] =useState("en");
    const [Outputformat , setOutputFormat] = useState("hi");
    const [translatedText, setTranslatedText] = useState('Translation'); 


    const handleReverseLanguage = () => { 
        const value = Inputformat; 
        setInputFormat(Outputformat); 
        setOutputFormat(value); 
        setInputText(''); 
        setTranslatedText('Translation'); 
    } 

    const handleRemoveInputText = () => { 
        setInputText(''); 
        setTranslatedText('Translation'); 
    } 

     const handleTranslate = async ()=>{
        if(!InputText || !Inputformat || !Outputformat) return ;
        document.querySelector('.fa.fa-spinner.fa-spin').style.display = "block"; 
        document.querySelector('.translate').style.display = 'none'; 


   const url = 'https://text-translator2.p.rapidapi.com/translate';

    const options = {
	method: 'POST',

	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'bde511d780msha4c618dea139934p13ec84jsn49fcad5edd30',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},

    body: JSON.stringify([ 
        { 
            Text: InputText 
        } 
    ]) 
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
    const responseObject = JSON.parse(result); 
    const translation = responseObject[0].translations[0].text; 
    setTranslatedText(translation); 

} catch (error) {
	console.error(error);
    alert("Please Try Again! Some Error Occurred at your side"); 
}
  
    document.querySelector('.fa.fa-spinner.fa-spin').style.display = "none"; 
    document.querySelector('.translate').style.display = 'block'; 

     }



  return (
    <div className="container"> 
            <div className="row1"> 
                <select value={Inputformat}  
                        onChange={(e) => setInputFormat(e.target.value)}> 
                    {Object.keys(languageList).map((key, index) => { 
                        const language = languageList[key]; 
                        return ( 
                            <option key={index} value={key}>{language.name}</option> 
                        ); 
                    })} 
                </select> 
                <svg className='reversesvg' 
                     onClick={handleReverseLanguage}  
                     focusable="false" 
                     xmlns="http://www.w3.org/2000/svg" 
                     viewBox="0 0 24 24"> 
                <path d= 
"M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"> 
                </path> 
                </svg> 
                <select value={Outputformat} onChange={(e) => { 
                    setOutputFormat(e.target.value); 

                    setTranslatedText('Translation'); 
                }}> 
                    {Object.keys(languageList).map((key, index) => { 
                        const language = languageList[key]; 
                        return ( 
                            <option key={index + 118} value={key}>{language.name}</option> 
                        ); 
                    })} 
                </select> 
            </div> 
            <div className="row2"> 
                <div className="inputText"> 
                    <svg className='removeinput' 
                         style={{ display: (InputText.length) ? "block" : "none" }}  
                         onClick={handleRemoveInputText}  
                         focusable="false" 
                         xmlns="http://www.w3.org/2000/svg" 
                         viewBox="0 0 24 24"> 
                         <path d= 
"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"> 
                        </path> 
                    </svg> 
                    <textarea type="text" 
                              value={InputText}  
                              placeholder='Enter Text' 
                              onChange={(e) => setInputText(e.target.value)} /> 
                </div> 
                <div className="outputText">{translatedText}</div> 
            </div> 
            <div className="row3"> 
                <button className='btn' 
                        onClick={handleTranslate}> 
                        <i className="fa fa-spinner fa-spin"></i> 
                        <span className='translate'>Translate</span> 
                </button> 
            </div> 
        </div> 
    ) 
}
