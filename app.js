const chalk=require('chalk')
const yargs=require('yargs')
const notes=require('./notes.js')

//Customise yargs version
yargs.version('1.1.0')

//Create an add command
yargs.command({
    command:'add',
    describe:'Add a New Note',
    builder:{
        title:{
            describe:'Note Title',
            demandOption: true,
            type:'string'
        },

        body:{
            describe:'Note Body',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

//Create a remove command
yargs.command({
    command:'remove',
    describe:'Remove an Existing Note',
    builder:{
        title:{
            describe: "Note Title",
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//Create a list command
yargs.command({
    command:'list',
    describe:'List your Notes',
    handler(){
        notes.listNotes()
    }
})

//Create a read command
yargs.command({
    command:'read',
    describe:'Read an Existing Note',
    builder:{
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})
yargs.parse()