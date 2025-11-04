import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function VisitsPage({ stats, darkMode }) {
  const [animatedStats,setAnimatedStats] = useState({totalVisits:0,visitsToday:0,uniqueUsers:0});

  useEffect(()=>{
    if(!stats) return;
    const duration=1, steps=50, interval=duration*1000/steps;

    const animateValue=(start,end,set,key)=>{
      let current=start;
      const increment=(end-start)/steps;
      const anim=setInterval(()=>{
        current+=increment;
        set(prev=>({...prev,[key]:Math.round(current)}));
      },interval);
      setTimeout(()=>clearInterval(anim),duration*1000);
    };

    animateValue(animatedStats.totalVisits,stats.totalVisits,setAnimatedStats,'totalVisits');
    animateValue(animatedStats.visitsToday,stats.visitsToday,setAnimatedStats,'visitsToday');
    animateValue(animatedStats.uniqueUsers,stats.uniqueUsers,setAnimatedStats,'uniqueUsers');
  },[stats]);

  return (
    <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.6}}
      className={`max-w-4xl mx-auto mt-10 p-6 rounded-3xl shadow-2xl transition-colors ${darkMode?'bg-gray-800 text-gray-100':'bg-white text-gray-900'}`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Stato Visite</h2>
      {!stats? <p className="text-center">Caricamento in corso...</p> :
        <ul className="space-y-3 text-lg font-medium">
          <li><strong>Visite totali:</strong> {animatedStats.totalVisits}</li>
          <li><strong>Visite oggi:</strong> {animatedStats.visitsToday}</li>
          <li><strong>Utenti unici:</strong> {animatedStats.uniqueUsers}</li>
          <li>
            <strong>Ultime pagine visitate:</strong>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              {stats.lastPages?.map((page,idx)=>(
                <motion.li key={idx} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:idx*0.1}}>
                  {page}
                </motion.li>
              ))}
            </ul>
          </li>
        </ul>
      }
    </motion.div>
  );
}
