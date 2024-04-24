const deleteProduct = (btn) => {
  const prodID = btn.parentNode.querySelector("[name=productID]").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;

  const productElement = btn.closest(".box");

  fetch("/admin/product/" + prodID, {
    method: "DELETE",
    headers: {
      "csrf-token": csrf,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      if (data.message === "Success!") {
        productElement.remove();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
