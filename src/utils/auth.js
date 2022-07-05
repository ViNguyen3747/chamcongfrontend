import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  isAdmin() {
    return localStorage.getItem("admin") === "true";
  }
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken, name, admin) {
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("name", name);
    localStorage.setItem("admin", admin);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
    window.location.assign("/");
  }
}

export default new AuthService();
