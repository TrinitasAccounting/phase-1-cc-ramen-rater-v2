// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  //This is the function that will display each ramens information in the middle of the screen div. Needs to be called inside of displayRamens()
  const middlePageImage = document.querySelector('.detail-image');
  const middlePageName = document.querySelector('.name');
  const middlePageDescription = document.querySelector('.restaurant');
  const middlePageRating = document.querySelector('#rating-display');
  const middlePageComment = document.querySelector('#comment-display');
  middlePageImage.src = ramen.image;
  middlePageImage.alt = ramen.name;
  middlePageName.textContent = ramen.name;
  middlePageDescription.textContent = ramen.restaurant;
  middlePageRating.textContent = ramen.rating;
  middlePageComment.textContent = ramen.comment;

};


//Advanced Deliverable
//Making a POST request for the new ramen submitted
const addRamenToDB = (newObj) => {
  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newObj)
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((error) => {
      alert('that didnt work');
      console.log(error.message)
    });
}




const addSubmitListener = () => {
  // Add code
  //Adding the submit listener to the form 
  const submissionForm = document.querySelector('#new-ramen');
  submissionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputName = document.getElementById('new-name');
    const inputRestaurant = document.getElementById('new-restaurant');
    const inputImageUrl = document.getElementById('new-image');
    const inputRating = document.getElementById('new-rating');
    const inputComment = document.getElementById('new-comment');

    const newRamenObj = {
      name: inputName.value,
      restaurant: inputRestaurant.value,
      image: inputImageUrl.value,
      rating: inputRating.value,
      comment: inputComment.value
    };



    //Advanced Deliverable: ****I was note sure how to do it any other way other than using the POST request
    //this is adding the ramen to the database permenantely

    // addRamenToDB(newRamenObj);  





    //Core Devliverable : Adding to Page ****I do not need this anymore since I am POSTing it to the database directly
    //This is going to be appending a child to the div element

    const newRamenToAdd = document.createElement('img');
    newRamenToAdd.src = inputImageUrl.value;
    ramenTopMenu.appendChild(newRamenToAdd);

    newRamenToAdd.addEventListener('click', (event) => {
      handleClick(newRamenObj);
    })


  })

}


const ramenTopMenu = document.querySelector('#ramen-menu');

const displayRamens = () => {
  // Add code
  //This is where we fetch and all ramens are displayed at the top of the page 
  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => data.forEach((ramenItem) => {


      const ramenImgElement = document.createElement('img');
      ramenImgElement.src = ramenItem.image;
      ramenTopMenu.appendChild(ramenImgElement);

      ramenImgElement.addEventListener('click', () => {
        handleClick(ramenItem);
      })




      //Advanced Deliverable #1
      handleClick(data[0]);
    }
    ))

};






//Advanced Deliverable: Delete a Ramen


// const deleteARamen = () => {

//   const middlePageImage = document.querySelector('.detail-image');
//   const middlePageName = document.querySelector('.name');
//   const middlePageDescription = document.querySelector('.restaurant');
//   const middlePageRating = document.querySelector('#rating-display');
//   const middlePageComment = document.querySelector('#comment-display');

//   const deleteButton = document.getElementById('delete-button');
//   deleteButton.addEventListener('click', () => {
//     // console.log(middlePageName.textContent)



//   })
// }



// const deleteASpecificRamen = (id) => {
//   fetch(`http://localhost:3000/ramens/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     }
//   })
//     .then(res => res.json())
//     .then(data => console.log(data))
// };

// deleteASpecificRamen('fd77');








const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();

  // deleteARamen();
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
