export function displayToaster(message) {
  const toast = document.createElement("div");
  const toastBody = document.createElement("div");

  toast.classList.add(
    "toast",
    "text-secondary-emphasis",
    "bg-secondary-subtle"
  );
  toast.role = "alert";
  toast.ariaAtomic = "true";
  toast.ariaLive = "assertive";

  toastBody.classList.add("toast-body");
  toastBody.innerText = message;
  toast.appendChild(toastBody);
  toastContainer.appendChild(toast);

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();
}
