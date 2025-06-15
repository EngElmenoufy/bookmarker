var siteName = document.getElementById("site-name");
var siteUrl = document.getElementById("site-url");
var bookmarksTable = document.getElementById("bookmarks-table");
var bookmarksFromLocalStorage = localStorage.getItem("bookmarkList");
var bookmarkList = [];

if (bookmarksFromLocalStorage) {
  bookmarkList = JSON.parse(bookmarksFromLocalStorage);
  displayBookmarks(bookmarkList);
}

function addBookmark() {
  if (checkBookmarkExist(siteName.value)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The bookmark name already exists.",
    });
  } else if (isValidationName() && isValidationUrl()) {
    var site = {
      name: siteName.value,
      url: getUrl(siteUrl.value),
    };

    bookmarkList.push(site);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));

    displayBookmarks(bookmarkList);

    clearInputs();
  } else {
    Swal.fire({
      icon: "error",
      title: "Site Name or Url is not valid, Please follow the rules below :",
      text: "Site name must contain at least 3 characters, and site URL must be a valid one",
    });
  }
}

function checkBookmarkExist(bookmarkName) {
  for (var i = 0; i < bookmarkList.length; i++) {
    if (bookmarkList[i].name === bookmarkName) {
      return true;
    }
  }

  return false;
}

function getUrl(url) {
  var urlPattern = /^https?:\/\//;
  if (!urlPattern.test(url)) {
    return "https://" + url;
  }
  return url;
}

function displayBookmarks(bookmarks) {
  var bookmarksBox = "";

  for (let i = 0; i < bookmarks.length; i++) {
    bookmarksBox += `
        <tr>
          <td>${i + 1}</td>
          <td class="text-capitalize">${bookmarkList[i].name}</td>
          <td><a rel="noopener" href=${
            bookmarkList[i].url
          } class="btn btn-visit" target="_blank"><i
                class="fa-solid fa-eye"></i>
              Visit</a></td>
          <td><button type="button" class="btn btn-delete" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
    `;
  }

  bookmarksTable.innerHTML = bookmarksBox;
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  displayBookmarks(bookmarkList);
}

function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}

function isValidationName() {
  if (siteName.value.length < 3) {
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
    return false;
  } else {
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
    return true;
  }
}

function isValidationUrl() {
  var urlPattern =
    /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()+,;=])?$/;

  if (urlPattern.test(siteUrl.value)) {
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.add("is-valid");
    return true;
  } else {
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
    // siteName.addEventListener()
    return false;
  }
}
