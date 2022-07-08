const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  console.log(videoComments);
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  const span = document.createElement("span");
  console.log(span);
  console.log(text);
  span.innerText = `${text}`;
  newComment.appendChild(span);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const btn = form.querySelector("button");
  const text = textarea.value;
  const videoID = videoContainer.dataset.id;
  const { status } = await fetch(`/api/videos/${videoID}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (status === 201) {
    addComment(text);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
