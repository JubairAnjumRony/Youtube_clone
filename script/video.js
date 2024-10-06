console.log('video script added');
// 1 - Fetch ,Load and show categories on html

// create LoadCategories

const LoadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then(data =>displayCategories(data.categories))
    .catch((error) => console.log(error));
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
const displayCategories =(categories) =>{
    // add data in html
    const categoryContainer =document.getElementById("categories");
    categories.forEach((item) =>{
        console.log(item);
        const button = document.createElement("button");
        button.classList= "btn";
        button.innerText = item.category;
        categoryContainer.append(button);
    });
};

const displayVideos = (videos) =>{
    const videoContainer =document.getElementById("videos");
    videos.forEach((item) =>{
      console.log(item);
      const card =document.createElement('div');
      card.classList ="card card-compact";
      card.innerHTML =
      `
        <figure class="h-[200px]">
    <img
      src=${
        item.thumbnail}}
        class = "h-full w-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="px-o py-2 flex gap-2">
     
      <div >
         <img class="w-10 h-10 rounded-full object-cover" src ="${item.authors[0].profile_picture}"/>
      </div>
      
     <div> 
        <h2> ${item.title} </h2>
    </div>
</div>
    <div class="flex items-center gap-2">
      <div>
       <p class ="text-gray-400">${item.authors[0].profile_name} </p>
        </div>
    <div>
    <img src ="https://img.icons8.com/?size=48&id=91kLZWvmd4sg&format=png"/>
   </div>

  </div>
      `;
      videoContainer.append(card);
    });
}

LoadCategories();
loadVideos();