import React from 'react'
import { useGetAllTodoQuery } from '../redux/feature/post-api/postSlice'

const TodoPage = () => {
    const {data,isLoading,error} = useGetAllTodoQuery();
    if(isLoading){
        return (
            <div>
                <h1> Loading... </h1>
            </div>
        )
    }
    console.log(data)
  return (
    <div>
        <div className=' grid grid-cols-4 gap-6  ' >
            {
                data.map((item,i)=>{
                    return(
                        <div key = {i} className=' border border-black p-5  ' >
                            <h1>{item?.title}</h1>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default TodoPage