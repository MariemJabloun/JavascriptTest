const draw=require('../common/draw.js');
// in console install node-canvas who is a canvas implementation for Node.js
//npm install canvas
// this will generate package-lock.json, package.json and the node_module package

const constants= require('../common/constants.js')
const utils= require('../common/utils.js')
// we can require the createCanvas function from the Canvas Module
const {createCanvas}=require('canvas');
const canvas=createCanvas(400,400);
// get reference to the drawing context
const ctx=canvas.getContext('2d');

//use the file system
const fs=require('fs');
//read from the directory
const fileNames=fs.readdirSync(constants.RAW_DIR);
const samples=[];
let id=1;
fileNames.forEach(element => {
    //extract the content from the raw directory
    //concatenated with the RAW directory
    const content=fs.readFileSync(
        constants.RAW_DIR+"/"+element
    );

    //from the string, we extract the session, student and drawings by parsing the JSON
    const {session, student, drawings}=JSON.parse(content);

    for(let label in drawings){
        samples.push({
            id,
            label,
            student_name:student,
            student_id: session  // to make the student unique
        });
        const paths=drawings[label];
        fs.writeFileSync(
            constants.JSON_DIR+"/"+id+".json",
            JSON.stringify(paths)
        );
        
        // generate an image from the paths
        generateImageFile(constants.IMG_DIR+"/"+id+".png",
        paths);
        // each file has 8 drawings
        utils.printProgress(id, fileNames.length*8);
        id++;
    }
    
});

fs.writeFileSync(constants.SAMPLES, 
    JSON.stringify(samples)
);

fs.writeFileSync(constants.SAMPLES_JS, 
    "const samples="+JSON.stringify(samples)+";"
);

function generateImageFile(outFile, paths){
    // it's the same canvas for each of samples, so it should be cleared first
    ctx.clearRect(0,0, canvas.width, canvas.height);
    draw.paths(ctx, paths);
    const buffer=canvas.toBuffer("image/png");
    fs.writeFileSync(outFile, buffer);
}