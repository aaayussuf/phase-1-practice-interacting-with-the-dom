// Select DOM elements
const counter = document.getElementById("counter");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const heartButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const commentForm = document.getElementById("comment-form");
const commentsList = document.getElementById("list");
const likesList = document.querySelector(".likes");

// Initialize state
let count = 0;
let isPaused = false;
let intervalId;

// Function to update the counter display
function updateCounter() {
  counter.textContent = count;
}

// Function to start the timer
function startTimer() {
  intervalId = setInterval(() => {
    if (!isPaused) {
      count++;
      updateCounter();
    }
  }, 1000);
}

// Function to toggle pause and resume
function togglePause() {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "resume" : "pause";
  const buttons = [plusButton, minusButton, heartButton];

  buttons.forEach(button => {
    button.disabled = isPaused;
  });

  if (!isPaused) {
    startTimer();
  } else {
    clearInterval(intervalId);
  }
}

// Event Listeners

// Increment counter when the plus button is clicked
plusButton.addEventListener("click", () => {
  count++;
  updateCounter();
});

// Decrement counter when the minus button is clicked
minusButton.addEventListener("click", () => {
  count--;
  updateCounter();
});

// Like the current number
heartButton.addEventListener("click", () => {
  const existingLike = document.querySelector(`[data-num='${count}']`);
  if (existingLike) {
    const likeCount = existingLike.querySelector("span");
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  } else {
    const li = document.createElement("li");
    li.dataset.num = count;
    li.innerHTML = `Number ${count} has been liked <span>1</span> time(s).`;
    likesList.appendChild(li);
  }
});

// Pause or resume the timer
pauseButton.addEventListener("click", togglePause);

// Add comments
commentForm.addEventListener("submit", event => {
  event.preventDefault();
  const commentInput = event.target.elements["comment"];
  const commentText = commentInput.value;

  if (commentText.trim() !== "") {
    const p = document.createElement("p");
    p.textContent = commentText;
    commentsList.appendChild(p);
    commentInput.value = "";
  }
});

// Start the timer when the page loads
startTimer();
