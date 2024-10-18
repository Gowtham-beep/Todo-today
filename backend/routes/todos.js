const express=require('express')
const mongoose=require('mongoose')
const{Todo}=require('../DB/index')
const {userMiddleware}=require('../middlewares/user')
const router=express.Router()

router.post('/createTodo', userMiddleware,async (req,res)=>{
    const{title,description}=req.body
    console.log(title,description)
    console.log(req.userId)
    try{
        const todo=await Todo.create({
            title:title,
            description:description,
            status:false,
            userId:req.userId
        })
        console.log(todo)
        res.json({
            message:'todo added successfully',
            todo
        })
    }catch(error){
        console.error("Error in adding todo:", error.message);
        res.json({
            message:"error in adding todo",
            error: error.message
        })
    }
})
router.get('/readTodo',userMiddleware,async (req,res)=>{
    const todos=  await Todo.find({userId:req.userId})
    try{ if(todos){
            res.json({
                todos
            })
        }else{
            res.json({
                message:'No todos exist'
            })
        }
    }catch(error){
        res.json({
            message:'error in fetching todos',
            error:error
        })
    }
})
router.put('/statusTodo/:id',userMiddleware,async (req,res)=>{
    const {id}=req.params
    const updatedPayload=req.body
    if(typeof updatedPayload.status ==='undefined'){
        return res.status(400).json({
            msg: "You must provide a completed status.",
        }) 
    }
try{
    const result=await Todo.updateOne(
        {_id:id},
        {status:updatedPayload.status}
    )
    console.log("Updateded Status",updatedPayload)
    res.json({
        msg: "Todo marked as completed.",
    });
}catch(error){
    console.log(error.message)
    res.status(500).json({
        msg: "Error updating todo.",
        error: error.message,
    });
}
})
router.delete('/deleteTodo/:id', userMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await Todo.deleteOne({ _id: id });
        
        if (deletedTodo.deletedCount === 0) {
            return res.json({
                message: "Todo not found, no document was deleted",
            });
        }
        
        res.json({
            message: "Todo deleted successfully",
            deletedTodo
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Error in deleting the todo",
            error: error.message
        });
    }
});


module.exports=router