// CAROUSEL
!(function (d) {
  const itemClassName = "carousel-card-desktop",
    items = d.getElementsByClassName(itemClassName),
    totalItems = items.length;

  let moving = true,
    slide = 0;

  // Set Classes
  function setInitialClasses() {
    // prev Targets the previus, current, and Prev items
    // Assumes there are at least 3 items

    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
  }

  // Set event listeners
  function setEventListners() {
    const next = d.getElementsByClassName("carousel_button--next")[0],
      prev = d.getElementsByClassName("carousel_button--prev")[0];

    next.addEventListener("click", moveNext);
    prev.addEventListener("click", movePrev);
  }

  // Next navigation handler
  function moveNext() {
    console.log("next clicked");
    // Check if moving
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (slide === totalItems - 1) {
        slide = 0;
      } else {
        slide++;
      }
      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Prev navigation handler
  function movePrev() {
    console.log("prev clicked");
    // Check if moving
    if (!moving) {
      // If it's the first slide set to last slide, else -1
      if (slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }
      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Disable overclicking the buttons
  function disableInteraction() {
    // Set 'moving' to true for the same duration as the transition
    moving = true;

    // setTimeout runs its function once after the given time
    setTimeout(function () {
      moving = false;
    }, 500);
  }

  function moveCarouselTo(slide) {
    // Check if carousel is moving, if not, allow interaction
    if (!moving) {
      // temporarily disable interactivity
      disableInteraction();
      // Update the "old" adjacent slides with "new" ones
      let newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;
      // Test if carousel has more than three items
      if (totalItems - 1 >= 3) {
        // Checks and updates if the new slides are out of bounds
        if (newPrevious <= 0) {
          oldPrevious = totalItems - 1;
        } else if (newNext >= totalItems - 1) {
          oldNext = 0;
        }
        // Checks and updates if slide is at the beginning/end
        if (slide === 0) {
          newPrevious = totalItems - 1;
          oldPrevious = totalItems - 2;
          oldNext = slide + 1;
        } else if (slide === totalItems - 1) {
          newPrevious = slide - 1;
          newNext = 0;
          oldNext = 1;
        }
        // Now we've worked out where we are and where we're going,
        // by adding/removing classes we'll trigger the transitions.
        // Reset old next/prev elements to default classes
        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;
        // Add new classes
        items[newPrevious].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      }
    }
  }

  // Call everything we need
  function initCarousel() {
    setInitialClasses();
    setEventListners();

    // Set moving to false so that the carousel becomes interactive
    moving = false;
  }

  initCarousel();
})(document);

// Add functionality for slides to move themselves every 4s
