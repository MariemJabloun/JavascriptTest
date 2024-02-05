class SketchPad{

    constructor(container, size=400){
        this.canvas= document.createElement("canvas");
        this.canvas.width=size;
        this.canvas.height=size;
        this.canvas.style=`
          background-color: white;
          box-shadow: 0px 0px 10px 2px black ; 
        `;


        // insert the canvas element in the document body
        container.appendChild(this.canvas);

        const lineBreak= document.createElement("br");
        container.appendChild(lineBreak);

        this.undoBtn= document.createElement("Button")
        this.undoBtn.innerHTML="UNDO";
        container.appendChild(this.undoBtn);

        this.ctx=this.canvas.getContext("2d");
        
        //an array of arrays, as we put many paths
        this.reset();
        // Add event listner to detect mouse actions
        // using a private method (using hashtag means it cannot be called outside the class)
        this.#addEventListeners();
    }

    //Method to reset the SketchPad
    reset(){
        this.paths=[];
        this.isDrawing=false;
        this.#redraw();
    }

    #addEventListeners(){
        this.canvas.onmousedown=(evt)=>{
            //figure out coordinate
            const mouse= this.#getMouse(evt);
            // These are attributes of the class
            //push an array that contains one point
            this.paths.push([mouse]);
            this.isDrawing=true;
        }

        //Only if is OnDrawing
        this.canvas.onmousemove=(evt)=>{
            if(this.isDrawing){
                const mouse =this.#getMouse(evt)
                // Push the mouse location 
                //add the point to the last path
                const lastPath= this.paths[this.paths.length-1];
                lastPath.push(mouse);
                // Redraw the mouse moves
                this.#redraw();
            }
        }

        document.onmouseup=()=>{
            this.isDrawing=false;
        }

        //event listener for touch on mobile phone is different that the mouse event 
        this.canvas.ontouchstart=(evt)=>{
            const loc=evt.touches[0];
            this.canvas.onmousedown(loc);
        }
        this.canvas.ontouchmove=(evt)=>{
            const loc=evt.touches[0];
            this.canvas.onmousemove(loc);
        }
        document.ontouchend=(evt)=>{
            const loc=evt.touches[0];
            this.canvas.onmouseup(loc);
        }
        this.undoBtn.onclick= ()=>{
            this.paths.pop();
            this.#redraw();
        }
    }

    #getMouse=(evt)=>{

        const rect=this.canvas.getBoundingClientRect();
        return [
               Math.round(evt.clientX-rect.left),
               Math.round(evt.clientY-rect.top)
            ]; 
    }

    #redraw= (evt)=>{
        //start by clearing th canvas
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        //draw paths using a draw utility object
        draw.paths(this.ctx, this.paths);
        //disable the button is nothing is drawed
        if(this.paths.length>0){
            this.undoBtn.disabled=false;
        }else{
            this.undoBtn.disabled=true;
        }

    }
}