import React from 'react'

const TitleComponent = ({title,style}) => {
  return (
    <div className={style}>
    <h1 className=' font-bold text-left '>{title}</h1>
    </div>
     
  )
}
export default TitleComponent
