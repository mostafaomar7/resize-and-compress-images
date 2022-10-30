let uploadBox = document.querySelector('.upload-box')
fileInput = document.querySelector('.upload-box input'),
privewimg = document.querySelector('.upload-box img'),
widthinput = document.querySelector('.width input'),
heightinput = document.querySelector('.height input'),
ratioinput = document.querySelector('.ratio input'),
qualityInput = document.querySelector('.quality input'),
downloadbtn = document.querySelector('.download-btn')

let ogImageRatio ;
let loadfile = (e) =>{
    let file = e.target.files[0];
    if(!file) return;
    privewimg.src= URL.createObjectURL(file)
    privewimg.addEventListener('load',() =>{
    document.querySelector('.wrapper').classList.add('active');
    widthinput.value=privewimg.naturalWidth;
    heightinput.value=privewimg.naturalHeight;
    ogImageRatio = privewimg.naturalWidth / privewimg.naturalHeight;
})
    privewimg.addEventListener('load',() =>{document.querySelector('.content').style.display='block'})
}

// getting width ,height according to the ratio checkbox status

widthinput.addEventListener('keyup', () => {
    const height = ratioinput.checked ? widthinput.value / ogImageRatio : heightinput.value;
    heightinput.value = Math.floor(height);
});
heightinput.addEventListener('keyup', () => {
    const width = ratioinput.checked ? heightinput.value * ogImageRatio : widthinput.value;
    widthinput.value = Math.floor(width);
});

let resizeAndDownload = () =>{
    const canvas = document.createElement('canvas');
    const a = document.createElement('a');
    const ctx =canvas.getContext('2d');
    const imgquality = qualityInput.checked ? 0.5 : 1.0   // 1.0 is 100% quality where 0.5 is 50% of total

// setting canvas height & width according to the input values
    canvas.width = widthinput.value;
    canvas.height = heightinput.value;

    // drawImage onto the canvas
    ctx.drawImage(privewimg ,0 ,0 , canvas.width,canvas.height)

    a.href = canvas.toDataURL("image/jpeg" , imgquality)
    a.download= new Date().getTime(); //passing current time as download value
    a.click();
}

fileInput.addEventListener('change' , loadfile)
uploadBox.addEventListener("click",() => fileInput.click())
downloadbtn.addEventListener('click', resizeAndDownload)
// let content = document.querySelector('.content')
// uploadBox.onclick=function(){
//     content.style.display='block'
// }


