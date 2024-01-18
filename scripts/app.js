window.history.replaceState(null, null, `#`);

var theme;
let isUpdatingUrl = false;
var datadevice = sessionStorage.getItem('theme');
console.log(`Datadevice: ${datadevice}`)

// if (datadevice) { theme = datadevice; } else { theme = 'light'; }

// toggleDarkMode('no-refresh')

// function toggleDarkMode(type = 'refresh') {
//   var icon = document.getElementById("icon");
//   icon.style.opacity = 0;

//   setTimeout(() => {
//       if (theme == 'dark') {
//           console.log('theme: light')
//           sessionStorage.setItem("theme", "dark");
//           DarkReader.setFetchMethod(window.fetch)
//           DarkReader.disable();
//           theme = 'light';
//           icon.classList.remove("fa-moon");
//           icon.classList.add("fa-sun");
//       } else {
//           console.log('theme: dark')
//           sessionStorage.setItem("theme", "light");
//           DarkReader.setFetchMethod(window.fetch)
//           DarkReader.enable();
//           theme = 'dark';
//           icon.classList.remove("fa-sun");
//           icon.classList.add("fa-moon");
//       }
//       icon.style.opacity = 1;
//   }, 500);
// }


function detectMobile() {
  return (window.matchMedia("(orientation: portrait)").matches);
}

if(detectMobile()) {
  if(!sessionStorage.getItem('forceMB')) {
    window.location.href = './mobile'
  }
}


window.addEventListener('load', function() {
  const skillElement = document.getElementById("id-skill");
  const words = ["✏️ Designer", "💻 Front-end Web Dev.", "🤺 Back-end Web Dev.", "✨ Flutter Dev.", "🦅 Community Supervisor  ", "🖥️ System Admin", "📷 Photographer"];
  let index = 0;
  let charIndex = 0;
  let typeInterval = null;
  let eraseInterval = null;

  function type() {
    skillElement.textContent = words[index].slice(0, charIndex + 1);
    charIndex++;
    if (charIndex >= words[index].length) {
      clearInterval(typeInterval);
      setTimeout(() => {
        eraseInterval = setInterval(erase, 25);
  
      }, 500);
    }
  }

  function erase() {
    skillElement.textContent = words[index].slice(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      clearInterval(eraseInterval);
      index = (index + 1) % words.length;
      charIndex = 0;
      typeInterval = setInterval(type, 100);
    }
  }
  typeInterval = setInterval(type, 250);
});

function updateUrl() {
  const viewportHeight = window.innerHeight;
  const elements = document.querySelectorAll('[id]');

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    
    if (element.getAttribute('id') !== 'circle') {
      const rect = element.getBoundingClientRect();
      const topDistance = Math.abs(rect.top);
      const bottomDistance = Math.abs(rect.bottom - viewportHeight);

      if (topDistance < viewportHeight && bottomDistance < viewportHeight) {
        const id = element.getAttribute('id');
        if(id == 'footer') {
          var cursorElement = document.getElementById('circle')
          cursorElement.style.background = '#ffffff85';
          var navigator = document.getElementById('navbtnctnr')
          navigator.style.display = 'none';
        } else {
          var cursorElement = document.getElementById('circle')
          cursorElement.style.background = ''
          var navigator = document.getElementById('navbtnctnr')
          navigator.style.display = 'flex';
        }
        window.history.replaceState(null, null, `#${id}`);
        return;
      }
    }
  }
}


window.addEventListener('scroll', updateUrl);

document.addEventListener("DOMContentLoaded", function() {
  document.body.style.fontFamily = "'Josefin Sans', sans-serif";

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = '10000';
  overlay.style.opacity = "0"; 
  overlay.style.transition = "opacity 500ms ease-in-out";
  document.body.appendChild(overlay);

  const helloText = ["👋 Howdy!"];

  const hello = document.createElement("h1");
  hello.style.fontFamily = "Josefin Sans";
  hello.style.fontSize = "5rem";
  hello.style.fontWeight = "bold";
  hello.style.textAlign = "center";
  hello.style.userSelect = "none";
  hello.style.margin = "0";
  hello.style.opacity = "0"; 
  hello.style.transition = "opacity 250ms ease-in-out";
  overlay.appendChild(hello);

  let index = 0;

  const intervalId = setInterval(() => {
    hello.style.opacity = "0";
    setTimeout(() => {
      hello.innerText = helloText[index];
      hello.style.opacity = "1";
      index++;
      if (index === helloText.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          overlay.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(overlay);
          }, 500);
        }, 1500);
      }
    }, 750);
  }, 1500);

  window.addEventListener("load", () => {
    overlay.style.opacity = "1";
  });
});


const gallery = document.querySelector('.gallery');
let scrollingLeft = true;
let continuestate = true;
gallery.addEventListener('mouseover', () => {
  continuestate = false;
})

gallery.addEventListener('mouseout', () => {
  continuestate = true;
})

function autoScrollGallery() {
  if (continuestate) {
      if (scrollingLeft) {
          gallery.scrollLeft += 2;
          if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) {
              scrollingLeft = false;
          }
      } else {
          gallery.scrollLeft -= 2;
          if (gallery.scrollLeft <= 0) {
              scrollingLeft = true;
          }
      }
  } else {
    if (scrollingLeft) {
      gallery.scrollLeft += 1;
      if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) {
          scrollingLeft = false;
      }
    } else {
        gallery.scrollLeft -= 1;
        if (gallery.scrollLeft <= 0) {
            scrollingLeft = true;
        }
    }
  }
}

setInterval(autoScrollGallery, 20);


const container = document.createElement("div");
container.style.display = "flex";
container.style.position = 'fixed'
container.style.alignItems = "center";
container.style.backgroundColor = "black";
container.style.bottom = 0;
container.style.right = 0;
container.style.zIndex = 20;
container.style.marginRight = '0.5%';
container.style.marginBottom = '0.5%';
container.style.borderRadius = '15px';
container.style.width = "calc(2.5vw + 2.5vh)";
container.style.justifyContent = 'center';
container.style.alignContent = 'center';
container.style.height = "5%";
container.id = 'navbtnctnr'

const arrowUp = document.createElement("div");
arrowUp.textContent = "▲";
arrowUp.style.userSelect = 'none';
arrowUp.style.cursor = 'pointer';
arrowUp.style.color = "white";
arrowUp.style.cursor = "pointer";
arrowUp.style.padding = "5px";

const divider = document.createElement("div");
divider.textContent = "|";
divider.style.color = "white";
divider.style.userSelect = 'none';

const arrowDown = document.createElement("div");
arrowDown.textContent = "▼";
arrowDown.style.color = "white";
arrowDown.style.userSelect = 'none';
arrowDown.style.cursor = 'pointer';
arrowDown.style.cursor = "pointer";
arrowDown.style.padding = "5px";

container.appendChild(arrowUp);
container.appendChild(divider);
container.appendChild(arrowDown);
document.body.appendChild(container);

arrowUp.addEventListener("click", () => {
    const deltaY = -100;
    const event = new WheelEvent("wheel", { deltaY: deltaY });
    handleScroll(event);
});

arrowDown.addEventListener("click", () => {
    const deltaY = 100;
    const event = new WheelEvent("wheel", { deltaY: deltaY });
    handleScroll(event);
});
  
  
window.addEventListener('scroll', updateUrl);


function checkImages() {
  let imageNumber = 1;
  let images = [];

  function loadImage() {
    const img = new Image();
    img.src = `https://bijsvennl.imgix.net/gallery/foto${imageNumber}.jpg?w=${screen.width / 4}`;

    img.onload = function() {
      images.push({
        path: img.src,
        width: img.width,
        height: img.height
      });

      const allImagesDiv = document.getElementById("all-images");
      const imgElement = document.createElement("img");
      imgElement.src = img.src;
      imgElement.className = "img-gallery";
      allImagesDiv.appendChild(imgElement);

      imageNumber++;
      loadImage();
    };

    img.onerror = function() {
      if (images.length > 0) {
        console.log(`Loaded ${images.length} images`);
      } else {
        console.log("Geen afbeeldingen gevonden.");
      }
    };
  }

  loadImage();
}

checkImages();