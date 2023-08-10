// script.js
let bgColor = null
let totalCards = 0
let colorLength = 0

//Fetch color data
fetch('https://random-flat-colors.vercel.app/api/random?count=5')
.then(response => response.json())
.then(data => {

   console.log(data.colors)
   const colorCodes = data.colors;
   colorLength = data.colors.length
   const colorContainer = document.getElementById('colorContainer');
   const colorContainerSidebar = document.getElementById('colorContainerSidebar');

   const dataDisplay = document.getElementById('dataDisplay')
   dataDisplay.innerHTML = `
    <div class="h-4 rounded-full w-full z-10 border border-black">
    </div>
    <p class="w-full ml-4">${totalCards}/${data.colors.length} creatives</p>
   `

   function hexToRgb(hex) {
    // Remove the '#' character if present
    hex = hex.replace("#", "");

    // Convert the hex value to decimal
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
    }

   function filterAndDisplayCardsbyBgColor(theColor) {
    const cardElements = document.querySelectorAll('.card');

    console.log("theColor",hexToRgb(theColor))
    cardElements.forEach(cardElement => {
        console.log("bgColor",cardElement.style.backgroundColor)
        const isMatch = cardElement.style.backgroundColor == hexToRgb(theColor)
        cardElement.style.display = isMatch ? 'block' : 'none';
    });
}

    colorCodes.forEach(colorCode => {
    const colorBlock = document.createElement('button');
    colorBlock.className = 'h-4 w-4 rounded-full hover:cursor-pointer border border-black';
    colorBlock.style.backgroundColor = colorCode;
    
    colorBlock.addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Color Code:', colorCode);
        filterAndDisplayCardsbyBgColor(colorCode)
    }); 
    colorContainer.appendChild(colorBlock);
    });

    colorCodes.forEach(colorCode => {
    const colorBlock = document.createElement('button');
    colorBlock.className = 'h-4 w-4 rounded-full hover:cursor-pointer border border-black';
    colorBlock.style.backgroundColor = colorCode;
    colorBlock.addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Color Code:', colorCode);
        bgColor = colorCode
    });    
    colorContainerSidebar.appendChild(colorBlock);
    });
})




function disableButton() {
    const button = document.getElementById('openSidebarButton');
    button.disabled = true;
    button.classList.add('opacity-50', 'cursor-not-allowed');
    button.classList.remove('opacity-100');
  }
  
  function enableButton() {
    const button = document.getElementById('openSidebarButton');

    button.disabled = false;
    button.classList.remove('opacity-100', 'cursor-not-allowed', 'cursor-pointer');
    button.classList.add('opacity-100');
  }


  document.addEventListener("DOMContentLoaded", function () {
      
      const cards = [];
  
      // Function to filter and display cards based on the search input
      function filterAndDisplayCards(searchText) {
          const cardElements = document.querySelectorAll('.card');
  
          cardElements.forEach(cardElement => {
              const cardTitle = cardElement.querySelector('h1').textContent.toLowerCase();
              const cardSubtitle = cardElement.querySelector('p').textContent.toLowerCase();
              const isMatch = cardTitle.includes(searchText) || cardSubtitle.includes(searchText);
              cardElement.style.display = isMatch ? 'block' : 'none';
          });
      }
  
      // Event listener for search input
      const searchInput = document.getElementById('searchInput');
      searchInput.addEventListener("input", function () {
          filterAndDisplayCards(searchInput.value.toLowerCase());
      });   
  });


//For sidebar
const openSidebarButton = document.getElementById('openSidebarButton');
const closeSidebarButton = document.getElementById('closeSidebarButton');
const sidebar = document.getElementById('sidebar');

openSidebarButton.addEventListener('click', () => {
    sidebar.classList.toggle('translate-x-full');
    openSidebarButton.disabled = true
});
closeSidebarButton.addEventListener('click', () => {
    sidebar.classList.toggle('translate-x-full');
    openSidebarButton.disabled = false
});



// Click event listener to each color button
document.getElementById('submitBtn').addEventListener('click', function() {
    if(totalCards >= colorLength) {
        return
    };
    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;

    const cardContainer = document.getElementById('cardContainer');
    const card = document.createElement('div');
    card.className = 'card w-1/2 md:w-1/3 py-6 px-4 my-4 border border-black rounded-md';
    card.innerHTML = `
    <div>
      <h1>${title}</h1>
      <p>${subtitle}</p>
    <div>
    `;
    card.style.backgroundColor = bgColor;

    console.log("card", card)

    cardContainer.appendChild(card);
    totalCards = totalCards + 1

    const dataDisplay = document.getElementById('dataDisplay')
    dataDisplay.innerHTML = `
        <div class="h-4 rounded-full w-full z-10 border border-black">
        <div class="w-${totalCards}/${colorLength} rounded-full h-4 bg-black m-0"></div>
        </div>
        <p class="w-full ml-4">${totalCards}/${colorLength} creatives</p>
    `
    console.log("totalCards",totalCards)

    // Clear inputs
    document.getElementById('title').value = '';
    document.getElementById('subtitle').value='';
});




//reset Color button
const resetButton = document.getElementById("resetColor")
resetButton.addEventListener('click', (e) => {
    e.preventDefault()
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(cardElement => {
        cardElement.style.display = 'block';
    });
});
