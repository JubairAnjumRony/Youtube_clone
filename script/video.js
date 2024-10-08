console.log('video script added');
// 1 - Fetch ,Load and show categories on html

// create LoadCategories
function getTimeString(time){

    const hour = parseInt(time/3600);
    let remainingSecond = time%3600;
    const minute =parseInt(remainingSecond/60);
     remainingSecond =remainingSecond%60;
    //  ${year} year ${month} month ${days} days
    return `${hour} hour ${minute} minute ${remainingSecond} seconds ago`;
}

const removeActiveClass= () =>{
  const buttons = document.getElementsByClassName("category-btn");
  console.log(buttons);
  for(let btn of buttons){
    btn.classList.remove("active");
  }
  
}
const LoadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) =>{
      
      displayCategories(data.categories)
    })
    .catch((error) => console.log(error));
};

const displayCategories =(categories) =>{
  // add data in html
  const categoryContainer =document.getElementById("categories");
  categories.forEach((item) =>{
      console.log(item);
      const buttoncontainer = document.createElement("div");
      // button.classList= "btn";
      // button.innerText = item.category;
      buttoncontainer.innerHTML =`
      <button id ="btn-${item.category_id}" onclick ="loadCategoryVideos(${item.category_id})"  class="btn category-btn">${item.category}
      </button>
      
      `;
      categoryContainer.append(buttoncontainer);
  });
};

const loadCategoryVideos = (id) =>{
  alert(id);
fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
.then((res) => res.json())
.then((data)=>{
removeActiveClass();
const activeBtn =document.getElementById(`btn-${id}`);
activeBtn.classList.add("active");

displayVideos(data.category)})
.catch((error)=>console.log(error));
};
// const cardDemo ={
//     "category_id": "1001",
//     "video_id": "aaal",
//     "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
//     "title": "Enchanted Harmonies",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
//             "profile_name": "Sophia Williams",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "7.6K",
//         "posted_date": "16450"
//     },
//     "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
// }

const loadVideos = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res =>res.json())
    .then(data => displayVideos(data.videos))
    .catch((error) =>console.log(error));
}


// "category_id": "1001",
//             "category": "Music"
// const displayCategories =(categories) =>{
//     // add data in html
//     const categoryContainer =document.getElementById("categories");
//     categories.forEach((item) =>{
//         console.log(item);
//         const button = document.createElement("button");
//         button.classList= "btn";
//         button.innerText = item.category;
//         categoryContainer.append(button);
//     });
// };


const displayVideos = (videos) =>{
  const videoContainer =document.getElementById("videos");
  videoContainer.innerHTML="";
  if(videos.length == 0){
    videoContainer.classList.remove("grid");
  videoContainer.innerHTML = 
  
    `
    <div class= "min-h-[300px] flex flex-col gap-5 justify-center items-center">
    <img src="./assets/Icon.png" alt="">
    <h2 class ="text-center text-xl font-bold">No content to show here</h2>
    </div>
    `;
    return;
  }
  else{
    videoContainer.classList.add("grid");
  }
  videos.forEach((item) =>{
    console.log(item);
    const card =document.createElement("div");
    card.classList ="card card-compact";
    card.innerHTML =
    `
      <figure class="h-[200px] relative">
  <img
    src=${
      item.thumbnail}
      class = "h-full w-full object-cover"
    alt="Shoes" />
 
  ${
      item.others.posted_date?.length == 0
        ? ""
        : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(
            item.others.posted_date
          )}</span>`
    }
    
</figure>
<div class="px-0 py-2 flex gap-2">
   
    <div >
       <img class="w-10 h-10 rounded-full object-cover" src =${item.authors[0].profile_picture}/>
    </div>
    
   <div> 
      <h2> ${item.title} </h2>

  <div class="flex items-center gap-2">
    
     <p class ="text-gray-400">${item.authors[0].profile_name} </p>
      
  
  
 
    ${item.authors[0].verified == true?
      `<img class="w-5" src ="https://img.icons8.com/?size=48&id=91kLZWvmd4sg&format=png"?/>`: "" }
   
</div>
<div>
 <p><button onclick="loadDetails('${item.video_id}')" class="btn btn-sm btn-error">Details</button></p>
    `;
    videoContainer.append(card);
  });
};
  

const loadDetails =async(videoId)=>{
  console.log(videoId);
  const uri =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data =await res.json();
  displayDetails(data.video);

}

const displayDetails =(video)=>{
  console.log(video);
  const detailcontainer = document.getElementById("modal-content");
  detailcontainer.innerHTML =`

  <img src= ${video.thumbnail}/>
  <p> ${video.description}</p>
  `;
  document.getElementById("custom_modal").showModal();
}
        





LoadCategories();
loadVideos();