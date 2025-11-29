export function showModal(
  success,
  accuracy,
  modalTitle,
  modalMessage,
  nextBtn,
  resultModal,
  currentLevel,
) {
  if (success) {
    modalTitle.textContent = "Perfect Match!";
    modalTitle.className = "modal-title success";
    modalMessage.textContent = `You matched all cells correctly! Accuracy: ${accuracy}%`;

    nextBtn.style.display = currentLevel < 5 ? "block" : "none";

    if (currentLevel === 5) {
      modalMessage.textContent = "You completed all levels! Play again?";

      nextBtn.textContent = "Play Again";
      nextBtn.style.display = "block";
    }
  } else {
    modalTitle.textContent = "Not Quite!";
    modalTitle.className = "modal-title error";
    modalMessage.textContent = `You matched ${accuracy}% of the cells. Try again!`;

    nextBtn.style.display = "none";
  }

  resultModal.classList.add("active");
}
