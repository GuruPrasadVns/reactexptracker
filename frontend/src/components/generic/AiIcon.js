import { AiFillExperiment } from "react-icons/ai";
function AiIcon({iconName, style}){
    if(iconName === 'AiFillExperiment')
        return <AiFillExperiment style={style}/>
    return null;
}

export default AiIcon;