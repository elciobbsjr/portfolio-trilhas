const pages=document.querySelectorAll(".page");
const navButtons=document.querySelectorAll("[data-page]");
const certificadosBtn=document.getElementById("certificadosBtn");

const certificadosLink="https://drive.google.com/drive/folders/1z1ACflTPXN6K-1GxlfOc5te90HxzlHAo?usp=sharing";

function showPage(pageId){
  pages.forEach(page=>{
    page.classList.remove("active");
  });

  const selectedPage=document.getElementById(pageId);

  if(selectedPage){
    selectedPage.classList.add("active");

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  }
}

navButtons.forEach(button=>{
  button.addEventListener("click",()=>{
    const targetPage=button.getAttribute("data-page");
    showPage(targetPage);
  });
});

certificadosBtn.addEventListener("click",()=>{
  window.open(certificadosLink,"_blank");
});

const glassButtons=document.querySelectorAll(".glass-button");

glassButtons.forEach(button=>{
  let currentX=button.offsetWidth/2;
  let currentY=button.offsetHeight/2;

  let targetX=currentX;
  let targetY=currentY;

  let currentRotateX=0;
  let currentRotateY=0;

  let targetRotateX=0;
  let targetRotateY=0;

  let hovering=false;
  let animationFrame=null;

  function animate(){
    currentX+=(targetX-currentX)*.11;
    currentY+=(targetY-currentY)*.11;

    currentRotateX+=(targetRotateX-currentRotateX)*.10;
    currentRotateY+=(targetRotateY-currentRotateY)*.10;

    button.style.setProperty("--x",`${currentX}px`);
    button.style.setProperty("--y",`${currentY}px`);

    if(hovering){
      button.style.transform=
        `translateY(-4px) perspective(900px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale(1.008)`;
    }

    animationFrame=requestAnimationFrame(animate);
  }

  button.addEventListener("mouseenter",event=>{
    hovering=true;

    const rect=button.getBoundingClientRect();

    targetX=event.clientX-rect.left;
    targetY=event.clientY-rect.top;

    currentX=targetX;
    currentY=targetY;

    button.style.setProperty("--glass-opacity","1");

    if(!animationFrame){
      animate();
    }
  });

  button.addEventListener("mousemove",event=>{
    const rect=button.getBoundingClientRect();

    targetX=event.clientX-rect.left;
    targetY=event.clientY-rect.top;

    const centerX=rect.width/2;
    const centerY=rect.height/2;

    const normalizedX=(targetX-centerX)/centerX;
    const normalizedY=(targetY-centerY)/centerY;

    targetRotateY=normalizedX*1.6;
    targetRotateX=-normalizedY*1.25;

    const lightX=-normalizedX*8;
    const lightY=-normalizedY*8;

    button.style.setProperty("--light-x",`${lightX}px`);
    button.style.setProperty("--light-y",`${lightY}px`);
  });

  button.addEventListener("mouseleave",()=>{
    hovering=false;

    button.style.setProperty("--glass-opacity","0");

    targetX=button.offsetWidth/2;
    targetY=button.offsetHeight/2;

    targetRotateX=0;
    targetRotateY=0;

    button.style.setProperty("--light-x","0px");
    button.style.setProperty("--light-y","0px");

    button.style.transform="";

    setTimeout(()=>{
      if(!hovering&&animationFrame){
        cancelAnimationFrame(animationFrame);
        animationFrame=null;
      }
    },600);
  });
});