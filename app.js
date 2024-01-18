var theme;
let isUpdatingUrl = false;
var datadevice = sessionStorage.getItem('theme');

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
  const words = ["Designer", "Frontend Dev.", "Backend Dev.", "System Admin"];
  let index = 0;
  let charIndex = 0;

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


const gallery = document.querySelector('.gallery');
let scrollingLeft = true;
let continuestate = true;

gallery.addEventListener('mouseover', () => { continuestate = false })

gallery.addEventListener('mouseout', () => { continuestate = true })

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



if (window.innerWidth > 768) {
  var kinet = new Kinet({
      acceleration: 0.075,
      friction: 0.5,
      names: ["x", "y"],
  });

  var circle = document.getElementById('circle');

  kinet.on('tick', function (instances) {
      circle.style.transform = `translate3d(${instances.x.current}px, ${instances.y.current}px, 0) rotateX(${instances.x.velocity / 2}deg) rotateY(${instances.y.velocity / 2}deg)`;
  });

  function moveCursor(event) {
      lastMouseEvent = event;
      kinet.animate('x', event.pageX - window.innerWidth / 2);
      kinet.animate('y', event.pageY - window.innerHeight / 2);
  }

  document.addEventListener("mousemove", moveCursor, { passive: true });
}


var elementsAll = document.querySelectorAll("*");

elementsAll.forEach(function(element) {
  if (element.getAttribute('onclick') !== null || element.getAttribute('href') !== null || element.getAttribute('special') !== null) {
      element.addEventListener("mouseenter", function(event) {
          var mouse = document.getElementById('circle');
          mouse.style.padding = 'calc(1vw + 1vh)';
          mouse.style.marginLeft = '-2.25vw';
          mouse.style.marginTop = '-3.5vh';
          if (element.getAttribute('special') !== null) {
              mouse.style.background = `url('${element.getAttribute('special')}`;
              mouse.style.backgroundSize = "cover";
              mouse.style.padding = 'calc(2.5vw + 2.5vh)';
              mouse.style.marginLeft = '-5.125vw';
              mouse.style.marginTop = '-7.75vh';
              mouse.style.fontSize = 'calc(1vw + 1vh)';
          }
      });

      element.addEventListener("mouseleave", function(event) {
          var mouse = document.getElementById('circle');
          mouse.style.padding = '';
          mouse.style.marginLeft = '';
          mouse.style.marginTop = '';
          mouse.style.background = '';
          mouse.style.fontSize = '';
      });
  }
});


const sections = document.querySelectorAll("section");
let currentIndex = 0;
let isScrolling = false;
let tempSection = null;

function createTempSection() {
    let tempSection = document.createElement("section");
    var color = getRandomColor();
    tempSection.style.position = "absolute";
    tempSection.style.top = "0";
    tempSection.style.left = "0";
    tempSection.style.padding = "0";
    tempSection.style.margin = "0";
    tempSection.style.width = "100vw";
    tempSection.style.height = "100vh";
    tempSection.style.zIndex = "9999";
    tempSection.style.backgroundColor = color;
    tempSection.style.opacity = "0";
    tempSection.style.transition = "opacity 250ms ease-in-out";
    tempSection.style.display = "flex";
    tempSection.style.alignItems = "center";
    tempSection.style.justifyContent = "center";
    tempSection.style.color = "white";
    tempSection.style.fontSize = "calc(1.5vw + 1.5vh)";
    tempSection.style.fontWeight = "bold";
    tempSection.classList.add("temp-section");

    document.body.appendChild(tempSection);
    return tempSection;
}

function handleScroll(event) {
    if(document.querySelectorAll('.temp-section').length > 0) {
        event.preventDefault();
        return;
    }    

    event.preventDefault();

    const delta = event.deltaY;
    const nextIndex = currentIndex + (delta > 0 ? 1 : -1);

    if (nextIndex >= 0 && nextIndex < sections.length) {
        const currentSection = sections[currentIndex];
        const nextSection = sections[nextIndex];

        if (tempSection) {
            tempSection.remove();
        }

        tempSection = createTempSection();

        const sectionName = nextSection.id
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        tempSection.innerText = sectionName;
        tempSection.style.top = nextSection.offsetTop + "px";
        tempSection.style.opacity = 1;

        setTimeout(() => {
            tempSection.style.opacity = 0;
            currentIndex = nextIndex;
            setTimeout(() => {
                tempSection.remove();
            }, 250);
        }, 600);

        window.scrollTo({
            top: nextSection.offsetTop,
            behavior: "smooth"
        });
    }
}

window.addEventListener("wheel", handleScroll, { passive: false });

function getRandomColor() {
    const letters = '89ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}
