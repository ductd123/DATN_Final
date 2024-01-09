export default async function HelperLogOut() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.replace("/");
}

