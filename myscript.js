
     var images = new Array()
     images[0] = "images/joint.png";
     images[1] = "images/link.png";
     images[2] = "images/link1.png";
     setInterval("changeImage()", 30000);
     var x=0;

     function changeImage()
     {
                document.getElementById("img").src=images[x]
                x++;
                if (images.length == x) 
                {
                    x = 0;
                }
     }
