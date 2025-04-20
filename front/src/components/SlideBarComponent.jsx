import React, {useState,useRef} from 'react'

const SlideBarComponent = ({setSelected}) => {
    const divRefs = useRef([]);
    const [selectedIndex, setSelectedIndex] = useState(1);
   

    const handelClick = (label,index) => {
        setSelected(label);
        // Remove the class from prev div
        if(divRefs.current[selectedIndex]){
            divRefs.current[selectedIndex].classList.remove('border-creamyGreen', 'text-creamyGreen');
        }
        

        if(divRefs.current[index]){
            divRefs.current[index].classList.add('border-creamyGreen', 'text-creamyGreen');
        }
        setSelectedIndex(index);
    }
  return (
    <div className=' w-full overflow-x-auto whitespace-nowrap sm:mt-4 scrollbar-hide   flex items-center pb-0  border-b-[0.3px]'>
                    <div className='flex justify-evenly items-center  text-sm sm:text-base md:text-lg lg:text-xl gap-4 sm:gap-6 md:gap-8 lg:gap-20 xl:gap-40 px-2 min-w-[500px]    '>
                      
                       
                        { 
                        ["General Info", "Service & Pricing", "Employees", "Payment Settings"].map((label,index) => (
                            <div
                                key={label}
                                ref={(el) => (divRefs.current[index] = el)}
                                onClick={() => handelClick(label,index)}
                                className="shrink-0 pb-[4.5px] border-b-4 border-transparent hover:border-creamyGreen hover:text-creamyGreen transition duration-200"
                            >
                                {label}
                            </div>
                         ))}
                    </div>
    </div>
  )
}
export default SlideBarComponent