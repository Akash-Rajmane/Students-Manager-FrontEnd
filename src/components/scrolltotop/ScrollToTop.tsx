import {useEffect} from 'react';
import {useLocation} from 'react-router';
import useDetectFirstRender from '../../hooks/useDetectFirstRender';


const ScrollToTop = (props:any) => {
  const location = useLocation();
  const firstRender = useDetectFirstRender();

  const vh = window.innerHeight;

  useEffect(()=>{
    if(location.pathname==="/"){
     
      if(firstRender){
        window.scrollTo({top:0, behavior:"smooth"});
      }else{
        window.scrollTo({top:0.9*vh, behavior:"smooth"});
      }
   
    }else{
      window.scrollTo({top:0.9*vh, behavior:"smooth"});
    }
  },[location,vh])

  return (
    <div>{props.children}</div>
  )
}

export default ScrollToTop;

