
    let row=4;
    let col=4;
   let pieces="";
    for(let i=0,left=0,order=0;i<row; i++, left-=100){
        for(let j=0, top=0; j<col; j++,top-=100,order++){
            pieces +="<div id='pieces' data-order="+ order + " style='background-position:"+ top +"px "+ left+ "px;'> </div>";
        }
    }
    $("#imageContainer").html(pieces);
    
    $("#btnStart").click(function(){
        let randPieces=$("div #pieces");
        
        randPieces.each(function(){
            leftPosition=Math.floor(Math.random()*350);
            topPosition=Math.floor(Math.random()*350);
            $(this).addClass("draggablePiece");

            $(this).css({
                "position": "absolute",
                left: leftPosition +"px",
                top:  topPosition +"px"
               
            });
            $("#piecesContainer").append(randPieces);

        });
       
        let emptyGrid="";
        let row=4;
        let col=4;
        for( let i=0;i<row;i++){
            for(let j=0;j<col;j++){
                emptyGrid +="<div id='pieces' class='droppableSpace' style='background-image:none'> </div>";
            }
           
        }
        $("#imageContainer").html(emptyGrid);
        $(this).hide();
        $("#btnReset").show();
        implementLogic();
        
    });
    
    function checkOrder()
    {
      
        if($("#imageContainer .movingPiece").length!=16){
            
            return false;
            
        }
        for(let k=0; k<16; k++){
            
            let order=[ $("#imageContainer .movingPiece").attr("data-order")];
                if(k != order){
                    $("#piecesContainer").text("Opps! try again!");
                    return false;
                   }
                   else{
                   console.log("Congratulation! You win!");
 
                   $("#piecesContainer").text("Congratulation! You win!");
                   return true;
                   }                  
         }
        
    }

    
    function implementLogic(){
        
        $(".draggablePiece").draggable({
            revert:"invalid",
            start: function(){
                if( $(".droppableSpace").hasClass("piecePresent")){
                    $(".droppableSpace").removeClass("piecePresent");
                    let parent=$(this).parent();
                    console.log(parent);
                }
            }
          
        });
      
        $(".droppableSpace").droppable({
            hoverClass:"ui-state-highlight",
            accept:function(){
                return !$(this).hasClass("piecePresent");
            },
            drop:
            function(event, ui)
            {
               let dragPiece=ui.draggable;
               let dropSpace=$(this);
               dropSpace.addClass("piecePresent");

               $(dragPiece).addClass("movingPiece").css({
                left:0,
                top:0,
                position:"relative"

               }).appendTo(dropSpace);
               
               checkOrder();
            }
        });

        $("#btnReset").click(function(){
            location.reload(true);
        })

    }
