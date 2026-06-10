export const getCookie = (name: string) => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  }

export const setCookie = (name: string, value: boolean, days = 365) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();

    document.cookie =
        name + "=" + encodeURIComponent(value?"dark":"light") +
        "; expires=" + expires +
        "; path=/";
}