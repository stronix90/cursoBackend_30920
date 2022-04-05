const delProduct = async (id) => {
  const res = await fetch(`/productos/${id}`, {
    method: "DELETE",
  });

  await res.json();
  window.location.href = "/productos";
};
