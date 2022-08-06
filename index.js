const search = document.querySelector("#search");

let data = [];

const showOnScreen = (data = []) => { 
  const postContainer = document.querySelector('.posts');

  while (postContainer.hasChildNodes()) {
    postContainer.removeChild(postContainer.firstChild);
  }
  data.forEach((post) => {
    const photos = photosTag(post);
    postContainer.appendChild(photos);
  });
    
    // let elements = '';
    // data.forEach(post => {
    //   const postElement = document.createElement('div');
    //   postElement.classList.add('container'); 
    //   const TitleElement = document.createElement('div');
    //   TitleElement.classList.add('title')
    //   const ImageElement = document.createElement('img');
      
    //   ImageElement.src = post.thumbnailUrl;
    //   ImageElement.classList.add('image');
    //   TitleElement.innerHTML=post.title;
    //   ImageElement.innerHTML=post.thumbnailUrl;
    //   postContainer.appendChild(postElement);
    //   postElement.appendChild(TitleElement);
    //   postElement.appendChild(ImageElement);
    // })
        // elements += `<div class="container" > <div class="title">${post.title}</div> <img class="image" src=${post.thumbnailUrl} > <button>Sil</button> </div>`;
      
      
    // postContainer.innerHTML = elements;
  
};


const getPosts = async () => {
  
  try { 
    const res = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=50');
    
    if (res.status === 200) {
      data = await res.data;
      // console.log(data);
      showOnScreen(data);
    }
    
  } catch (error) {
    console.log(error);
  }
};

getPosts();

search.addEventListener('keyup', (e) => {
  const searchText = e.target.value.toLowerCase();
 
  const filtered = data.filter(post => {
   
    return post.title.toLowerCase().includes(searchText);
          
      
  });
  console.log(filtered);
  showOnScreen(filtered);
});

const photosTag = (post) =>{


    const postElement = document.createElement('div');
    postElement.classList.add('container'); 
    const TitleElement = document.createElement('div');
    TitleElement.classList.add('title')
    const ImageElement = document.createElement('img');
    const removeElement= document.createElement('button');
    removeElement.innerHTML="sil";
    removeElement.classList.add('button')
    removeElement.setAttribute("id","remove");
    removeElement.addEventListener("click",()=>{
      postElement.remove();
    })

    ImageElement.src = post.thumbnailUrl;
    ImageElement.classList.add('image');
    TitleElement.innerHTML=post.title;
    ImageElement.innerHTML=post.thumbnailUrl;
    
    postElement.appendChild(TitleElement);
    postElement.appendChild(ImageElement);
    postElement.appendChild(removeElement);
    return postElement
}