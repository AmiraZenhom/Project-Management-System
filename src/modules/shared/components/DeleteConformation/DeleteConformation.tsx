
import { Button, Modal } from 'react-bootstrap'
import deletePhoto from "../../../../assets/images/delete1.jpg"


export default function DeleteConformation({deleteFun,showDelete,handleCloseDelete}:any) {
    
  return (
    <>
     <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger ">Delete This Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="text-center text-danger">
           <img className="w-50 " src={deletePhoto} alt="deletePhoto" />
           <h5 className="my-4" >are you sure you want to delete this item ? if you are sure just click on delete it </h5>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger"  onClick={deleteFun} >
            Delete                   
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
