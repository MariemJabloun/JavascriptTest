const draw={};

draw.path=(ctx,path,color="black")=>{
    ctx.strokeStyle=color;
    ctx.linewidth=3;
    ctx.beginPath();
    //move to the first point in the path
    //path[0] has the X, Y isnide of an array
    ctx.moveTo(...path[0]);
    for(let i=1; i<path.length; i++){
        ctx.lineTo(...path[i]);
    }
    //enhance the draw
    ctx.lineCap="round";
    ctx.lineJoin="round";
    ctx.stroke();

}

//draw multiple paths even if we release the mouse
draw.paths=(ctx, paths, color="black")=>{
    for(const path of paths){
        draw.path(ctx, path, color);
    }
}

//export the entire object
if(typeof module!=='undefined'){
    // in nodejs, the browser doesn't know module 
    module.exports=draw;
}