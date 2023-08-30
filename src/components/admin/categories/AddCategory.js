import React,{useState, useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
 import '../../../css/admin css/category.css'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import { clearCategoryCreated,clearError } from '../../../slice/categorySlice';
import { createNewCategory } from '../../../actions/categoryAction';
import { getCategory } from '../../../actions/categoryAction';
import Adminpanel from '../Adminpanel';
import axios from 'axios';
function AddCategory(props) {
    const[images,setImages]=useState([]);
    const[imagesPreview, setImagesPreview]=useState([]);

    const{loading, isCategoryCreated, error, categories=[] } = useSelector(state => state.categoryState)

    const [categoryname,setCategoryName] = useState("");
    const[subCategory,setSubCategory]=useState("");
    
    const fetchCategory = ()=>
    {
      axios.get('/api/v1/admin/categories')
      .then((cat)=>{
        setCategoryName(cat.data.categories)
      })
      .catch(error=>{
        console.log(error);
      })
    }

    const onImagesChange = (e)=>{
        const files = Array.from(e.target.files);
    
        files.forEach(file=>{
    
            const reader = new FileReader()
            reader.onload = () => {
               if(reader.readyState === 2)
                {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }   
             }
            reader.readAsDataURL(file)
    
        })
    
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const clearImagesHandler = ()=>{
    setImages([]);
    setImagesPreview([]);

  }

  const addCategories=[

    'Gift',
    'Indoor plants',
    'Numismatist',
    'His & Her Essentials',
    'Utility products',


  ]


  const submitHandler = (e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('categories', categoryname)
    formData.append('subcategory', subCategory)

    images.forEach(image =>{
     formData.append('images', image)
    })
  dispatch(createNewCategory(formData))


}
useEffect(()=>{
  fetchCategory()
},[])

  useEffect(()=>{

    if(isCategoryCreated){
        toast('Category Created Succesfully!',{
            type: 'success',
            position: toast.POSITION.BOTTOM_CENTER,
            onOpen: () => dispatch(clearCategoryCreated())
        })
        navigate('/admin/product/allproducts')
        navigate('/category')
        return;
    }
    if(error)  {
        toast(error, {
            position: toast.POSITION.BOTTOM_CENTER,
            type: 'error',
            onOpen: ()=> { dispatch(clearError()) }
        })
        return
    }

 
  },[isCategoryCreated,error,dispatch,navigate])
   




    return (
        <div>
          <Adminpanel/>
             <div className='add_title admin-container'>
               <h2>Add Category </h2>
               <NavLink to='/category'><button className='view_cate'>  View Category</button></NavLink>
             </div>
             <div className='pt-3 admin-container me-0 form_element' style={{marginTop:"7rem",marginLeft:"3rem", display:"block", width:"75%"}}>
               <form onSubmit={submitHandler}>
                <div className='cate_form_detail'>
                  <div className='input_label'>
                  <label className='cate__name'>Category Name *  </label>
                  <label className='cate__name'>Image(optional) *  </label>
                  <label className='cate__name'>Active </label>
                  <label className='cate__name'>Description</label>
                 
                  </div>
                <div className='cate_inputfield'>
                <select class="form-control" onChange = {e=>setCategoryName(e.target.value)}  value={categoryname}>
                    
                    {addCategories.map((category,index)=>(
                    <option value={category}  key={index}>{category}</option>
                    ))}
                   
                  </select>
  
                <div className='cate_input select_img'><input type="file" className='hide_input' onChange={onImagesChange} multiple/></div>
                <input type="checkbox" classname="cate_input check" />
                <textarea cols="50" rows="10" className='cate_input description' ></textarea>
                </div>
                </div>

                <div className='images-container'>
                    <div className='img-preview'>
                    {imagesPreview.map(image=>(
                        <img
                        src={image} 
                        key={image}
                        alt=""
                       className='pre-img' />
            
                      ))}
                     {imagesPreview.length >  0 && <button id="delete-btn" className='add_category' onClick={clearImagesHandler} style={{cursor:"pointer"}} ><i className='fa fa-trash' style={{marginLeft:"-1rem",marginRight:"1rem"}}></i>Delete</button> }
                     </div>
                   
                 </div>
                 <button type="submit" disabled = {loading} className='add_category' >Add Category</button>

                  </form>
            </div>

            
        </div>
    );
}

export default AddCategory;