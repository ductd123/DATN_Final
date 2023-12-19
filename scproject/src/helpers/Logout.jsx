export default async function LogOut() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.replace("/");
}
