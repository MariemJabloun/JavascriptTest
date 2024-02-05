const constants=require('../common/constants.js');
const features=require('../common/features.js');

//create a file system
const fs=require('fs');

const samples=JSON.parse(
    fs.readFileSync(constants.SAMPLES)
);

//extract features by fetching data through all the samples
for(const sample of samples){
    const paths=JSON.parse(
        fs.readFileSync(
            constants.JSON_DIR+"/"+sample.id+".json";
        )
    )
}