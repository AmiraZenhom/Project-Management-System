
export default function Header({loginData}:any) {
  return (
    <>
    
    <div className=" text-white bgheader  rounded rounded-3   h-50   ">
     <div className='container pt-3  '>
       <h1 className='pt-5'>Welcome <span>{loginData?.userName}</span></h1>
      <h3 className='pt-3'>You can add project and assign tasks to your team</h3>
     </div>

    </div>
    </>
  )
}
