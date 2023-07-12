const expr = require("express")
const router = expr.Router()
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//Route:-1 for get all notes details using GET method /api/notes/fetchallnotes login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {

    //find the user who's notes are saved on the cloud by using fetchuser middleware that gives the user who's match with the auth token
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)

})


//Route:-2 for adding notes using post method /api/notes/addnotes login required

router.post("/addnotes", fetchuser, [
    body('title', "enter valid title").isLength({ min: 5 }),
    body('decription', "decription cannot be empty").isLength({ min: 5 }),], async (req, res) => {

        //if there is any error in validation then return bad requests
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }


        try {

            //destructring the value of notes schema 
            const { title, decription, tag } = req.body;

            //creating notes
            const notes = new Notes({
                title: title,
                decription: decription,
                tag: tag,
                user: req.user.id
            })
            notes.save().then(() => { console.log("notes succesfully created") })
            res.json(notes)

        }
        catch (error) {
            console.error(error)
            res.status(500).send("some error occured")
        }

    })

//Route:-3 for Updating notes using put method /api/notes/updatenotes login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    try {

        const { title, decription, tag } = req.body

        //create new note object
        const newnote = {}
        if (title) { newnote.title = title }
        if (decription) { newnote.decription = decription }
        if (tag) { newnote.tag = tag }

        //find the note to be updated and update it.
        let note = await Notes.findById(req.params.id)
        //check the user is exists or not
        if (!note) { return res.status(404).send("Not Found") }

        //check the user loggedin and updating notes is same or not
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed to update") }

        //update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note })

    }

    catch (error) {
        console.error(error)
        res.status(500).send("some error occured")
    }

})

//Route:-4 for Deleting notes using Delete method /api/notes/deletenotes login required
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {

        //find the note to be Deleted and Delete it.
        let note = await Notes.findById(req.params.id)

        //check the user is exists or not
        if (!note) { return res.status(404).send("Not Found") }


        //check the user loggedin and Deleting notes is same or not
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed to Delete") }

        //delete the notes
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success": "notes deleted" ,note:note})

    }

    catch (error) {
        console.error(error)
        res.status(500).send("some error occured")
    }


})
module.exports = router