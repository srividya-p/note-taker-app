const fs=require('fs')
const chalk=require('chalk')

const addNote=(title,body)=>{
    // to get previously formed array
    const notes=loadNotes()
    //checking for duplicate titles
    const duplicateNote=notes.find((note)=>note.title===title)
     
    if(!duplicateNote){//duplicateNote === undefined
    //use array.push to add new note into the json file object 
    notes.push({
        title:title,
        body:body
    })
    saveNotes(notes)
    console.log(chalk.green.bold("Note Added!"))
    } else{
        console.log(chalk.yellow.bold("Note taken Already!"))
    }

}

const saveNotes=(notes)=>{
    //write a note into the json file ie the whole updated notes aray
    dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes=()=>{
    try{
    //return the existing file in the form of an array object
    dataBuffer=fs.readFileSync('notes.json')
    data=dataBuffer.toString()
    return JSON.parse(data)
    }
    catch(e){
        //if it is the first time running then it will create a new file ie an empty array
        return []
    }
}

const removeNote=(title)=>{
    notes=loadNotes()
    const notesToKeep=notes.filter((note)=>note.title!==title)
    if(notesToKeep.length !=notes.length){
        saveNotes(notesToKeep)
        console.log(chalk.green.bold('Note Removed!'))
    }
    else{
        console.log(chalk.red.bold('Note not Found!'))
    }

}

const listNotes=()=>{
    notes=loadNotes()
    console.log(chalk.magentaBright.bold("Your Notes:"))
    notes.forEach((note)=>console.log(chalk.blueBright(note.title)))
}

const readNote=(title)=>{
    const notes=loadNotes()
    const toRead=notes.find((note)=>note.title===title)
    if(toRead){
    console.log(chalk.blueBright.bold(toRead.title))
    console.log(chalk.yellow(toRead.body))
    }else{
        console.log(chalk.red.bold('Note not Found!'))
    }
}

module.exports={
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
} 