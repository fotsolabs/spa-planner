import React, {useState,useRef,useEffect} from 'react'
import LogNav from '../components/LogNav'
import StickyBar from '../components/StickyBar'
import { GiStoneStack, } from 'react-icons/gi';
import { FaCog } from 'react-icons/fa'; // Font Awesome Gear Icon
import StickyComponent from '../components/stickyComponent'
import { IoIosLogOut } from "react-icons/io";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import TitleComponent from '../components/TitleComponent';
import SlideBarComponent from '../components/SlideBarComponent';
import { FiEdit2 } from "react-icons/fi";
import { PiTrashSimpleLight } from "react-icons/pi";
import AddServiceComponent from '../components/AddServiceComponent';
import EditServiceComponent from '../components/EditServiceComponent';
import  ServiceApi from '../api/ServiceApi';
import AddEmployeeComponent from '../components/AddEmployeeComponent';
import TableComponent from '../components/TableComponent';

import { set } from 'mongoose';

 const Settings = ({mode, setMode, bgColor}) => {


    const [services , setServices] = useState([]);  

    useEffect(() => {
        ServiceApi.getAllServices()
        .then((data) => {
            setServices(data.services);
           
        })
        .catch((error) => {
            console.error("Error fetching services:", error);
        });
    }, []);

    const employeesContent = [
        {   
            photo: 'https://via.placeholder.com/50',
            fullName: 'John Doe',
            email:'fotsoguiffo8@gmail.com',
            phone: '123-456-7890'

        },
        {   
            photo: 'https://via.placeholder.com/50',
            fullName: 'Jessica Smith',
            email:'fotsoguiffo8@gmail.com',
            phone: '123-456-7890'

        },
        {   
            photo: 'https://via.placeholder.com/50',
            fullName: 'paul Johnson',
            email:'paul@gmail.com',
            phone: '123-456-7890'

        },

    ]

    const [employees, setEmployees] = useState(employeesContent);

    const divRefs = useRef([]);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [selected, setSelected] = useState('Service & Pricing');
    const [showModal, setShowModal] = useState(false);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    
    const [editIndex, setEditIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    

    const renderModal = () => {
        if (showEmployeeModal) {
            return <AddEmployeeComponent 
                setShowEmpModal={setShowEmployeeModal} 
                employees={employees} 
                setEmployees={setEmployees} 
            />;
        }
        if (showModal) {
            return (
                <AddServiceComponent
                    setShowModal={setShowModal}
                    setContent={setServices}
                    content={services}
                    setModal={setShowModal}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setEditIndex={setEditIndex}
                    editIndex={editIndex}
                />
            );
        }
        return null;
    };
    


    const actionButton = (index,method,item) => {
       return ( 
            <td className="px-4 py-3">
                    <div className="flex gap-3 items-center">
                        <button className="text-blue-600 hover:text-blue-800">
                        <FiEdit2 size={18}
                        onClick={() => {
                            setEditIndex(index);
                            setIsEditing(true);
                            setShowModal(true); }}
                        />
                        </button>
                        <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => method(index,item)}
                        >
                        <PiTrashSimpleLight size={18} />
                        </button>
                    </div>
            </td>
            
        )
    }

    const modalSelection = () => {
        if(selected === "Employees"){
            console.log(selected);
            setShowEmployeeModal(true);
            
            
        }
        else{
            setShowModal(true);
        }

    }
    

    

    const contentMap = 
    {
        "Service & Pricing": "Add New Service",
        "Employees": "Add New Employee",
        "Payment Settings": "Add New Payment Method",
        "General Info": "General Info",
    };

    const showButton = selected !== "General Info";

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

    const deleteService =  async (index,item) => {
        try{
            const response =  await ServiceApi.deleteService(services[index]);
            console.log("Response from deleteService:", response.message);
            if(response.ok){
                setServices(prev => prev.filter((_, i) => i !== index));

            }
            else{
                console.error("Failed to delete service:", response.message);
                alert("Failed to delete service. Please try again.");

            }
        }catch (error) {
            console.error("Error deleting service:", error);
            alert("An error occurred while deleting the service.");
        }
        
        
    }

    const deleteEmployee = (index) => {
        setEmployees(prev => prev.filter((_, i) => i !== index));
    }
  return (
    
    <div className={`h-screen ${bgColor} flex  justify-center items-center font-dm`}>
        
        <StickyBar bgColor={"bg-stickyBarBg"}>
            <div className='flex flex-col justify-between h-screen '>
                <div>
                    <div className='p-9 flex justify-center items-center '>
                    <div>
                            <GiStoneStack size={36} className='text-creamyGreen'/>
                    </div>
                        <span className='text-4xl text-[#4d7c6f]' >LF</span>
                    </div>
                    {/* setting */}
                    <StickyComponent component={<FaCog size={15} className="text-creamyGreen"/>} text='Settings'/>
                    {/* Add employee */}
                    <StickyComponent component={<FaPersonCirclePlus size={15} className="text-creamyGreen"/>} text='Employee'/>
                    {/* Add client */}
                </div>
               
                {/* logout */}
                <div>
                    <StickyComponent component={<IoIosLogOut size={20} className="text-creamyGreen"/>} text={'Logout'}/>
                </div>

            </div>
           
            
        </StickyBar>
        

        {/* Main content */}
        <div className=' flex flex-col bg-white h-5/6 w-screen m-10 rounded-lg  shadow-sm  text-base sm:text-lg md:text-xl lg:text-4xl font-light mb-9 '>
            {/* Title */}
            <div className=' items-center   p-8'>
                {/* Title */}
                <TitleComponent title={selected} style={' font-playfair text-base sm:text-lg md:text-xl lg:text-4xl font-semibold mb-4 sm:mb-6 md:mb-8 lg:mb-10'}/>
                {/* Slide bar */}
                <SlideBarComponent ref={divRefs} setSelected={setSelected}/>
                <div className="mt-6 flex justify-between items-center">
                        {contentMap[selected] && (
                            <>
                                <TitleComponent title={contentMap[selected]} style={"font-playfair text-sm sm:text-sm md:text-base lg:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8 lg:mb-10 "}/>
                                {showButton && (
                                <button
                                    type="button"
                                    className="
                                    bg-creamyGreen text-white rounded-lg
                                    flex items-center gap-2
                                    text-[0.65rem] sm:text-sm md:text-lg lg:text-xl
                                    whitespace-nowrap
                                    px-3 sm:px-4 md:px-6 lg:px-8
                                    py-1 sm:py-1.5 md:py-2 lg:py-2
                                    "
                                    onClick={() => {modalSelection();}}
                                >
                                    <FaPlus className="text-xs sm:text-sm md:text-base lg:text-lg" />
                                    {contentMap[selected]}
                                </button>
                                )}
                            </>
                        )}
                        {/* Modal for adding employee */}
                        {renderModal()}
                     
                </div>
                
                {/* Content */}
                { selected === "Service & Pricing" && (
                    <TableComponent
                        headers={['Service Name', 'Duration', 'Price', 'Category', 'Actions']}
                        data={services}
                        bgColor={bgColor}
                        renderRow={(item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{item.serviceName}</td>
                                <td className="px-4 py-3">{item.duration}</td>
                                <td className="px-4 py-3">{item.price}</td>
                                <td className="px-4 py-3">{item.category}</td>
                                {actionButton(index,deleteService,item)}
                            </tr>
                        )}
                        
                    
                    />
                    
                )}
                            
            </div>
            
        </div>

        
        
    </div>

    
    
  )
}
export default Settings