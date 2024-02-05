const features={};

features.getPathCounts=(paths)=>{
    return paths.length;
}

features.getPointCount=(paths)=>{
    //first flatten the array of paths
    // it convert array of arrays in one big array
    const points=paths.flat();

    return points.length;
}

if(typeof module !== 'undefined'){
    module.exports=features;
}