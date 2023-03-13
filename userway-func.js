(function makePageImageAltAttributeCustomizable() {
  // API - FETCHING RANDOM WORD  */
  // NOTE* I have tried separate api request to another function but
  // since you cannot return value from try-catch block I've decided to leave it here
  const changeImageAltTagToRandomWord = async (element) => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word"
      );
      const data = await response.json();
      const firstWordData = data[0];
      changeImageAlt(element, firstWordData);
    } catch (err) {
      console.error(err);
      return;
    }
  };

  /* Colors */
  const customColor = {
    bgYellow: " rgba(255, 215, 0, 0.6)",
    bgYellow: "rgba(255, 255, 0, .6)",
    yellow: "#ffff00",
    black: "#000",
    accentYellow: "#FFD700",
    accentYellow2: "#f5bc2a",
    accentPurple: "#29025f",
  };

  const customGradient = {
    yellow: {
      moz: `-moz-linear-gradient(158deg, ${customColor.accentYellow2} 0%, ${customColor.yellow} 100%)`,
      webkit: `-webkit-linear-gradient(158deg, ${customColor.accentYellow2} 0%, ${customColor.yellow} 100%)`,
      def: `linear-gradient(158deg, ${customColor.accentYellow2} 0%, ${customColor.yellow} 100%)`,
    },
  };

  /* JS Styling */
  const addImageStyle = (element) => {
    element.style.color = "#000000";
    element.style.background = "#ffff00";
    element.style.font = "25px";
    element.style.border = "5px solid #FFD700";
    element.style.boxShadow = "0px 0px 24px 4px #FFD700";
    element.style["-moz-box-shadow"] = "0px 0px 24px 4px #FFD700";
    element.style["-webkit-box-shadow"] = "0px 0px 4px 4px #FFD700";
  };

  const addImageWrapperStyle = (imgWrapper, image) => {
    imgWrapper.style.top = `${image.offsetTop}px`;
    imgWrapper.style.left = `${image.offsetLeft}px`;
    imgWrapper.style.width = `${image.offsetWidth}px`;
    imgWrapper.style.height = `${image.offsetHeight}px`;
    imgWrapper.style.display = "block";
    imgWrapper.style.position = "relative";
    imgWrapper.style.margin = "0";
    imgWrapper.style.padding = "0";
  };

  const addImageOverlayStyle = (overlay, image) => {
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = `${image.offsetWidth}px`;
    overlay.style.height = `${image.offsetHeight}px`;
    overlay.style.backgroundColor = customColor.bgYellow;
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.margin = "0";
    overlay.style.padding = "0";
  };

  const addInnerDivStyle = (innerDiv) => {
    innerDiv.style.textAlign = "center";
    innerDiv.style.fontSize = "center";
    innerDiv.style.width = "60%";
    innerDiv.style.minWidth = "260px";
    innerDiv.style.height = "40%";
    innerDiv.style.minHeight = "180px";
    innerDiv.style.padding = "10px 20px";
    innerDiv.style.backgroundColor = customColor.black;
    innerDiv.style.borderRadius = "5px";
    innerDiv.style.border = "2px solid #FFD700";
    innerDiv.style.color = "#f5f5f5";
    innerDiv.style.fontWeight = "bold";
  };

  const addTagNameStyle = (tagName) => {
    tagName.style.display = "flex";
    tagName.style.flexDirection = "column";
    tagName.style.alignItems = "center";
    tagName.style.justifyContent = "center";
    tagName.style.fontWeight = "bold";
    tagName.style.margin = "10px 5px";
    tagName.style.color = customColor.accentYellow;
    tagName.style.whiteSpace = "nowrap";
  };

  const addAltInputStyle = (input) => {
    input.style.backgroundColor = customColor.accentYellow;
    input.style.borderRadius = "5px";
    input.style.border = "2px solid #FFD700";
    input.placeholder = "Enter new alt tag";
    input.style.color = customColor.black;
    input.style.fontSize = "22px";
    input.style.fontWeight = "bold";
    input.style.width = "220px";
    input.style.padding = "4px";
    input.style.margin = "4px";
    input.style.marginTop = "8px";
    input.style.boxShadow = "1px 1px 2px 2px #FFD700";
  };

  const addSpanStyle = (altTag) => {
    const span = document.querySelector(`[data-id="${altTag}"]`);
    span.style.background = customColor.accentYellow;
    span.style.background = customGradient.yellow.moz;
    span.style.background = customGradient.yellow.webkit;
    span.style.background = customGradient.yellow.def;
    span.style.color = customColor.black;
    span.style.wordWrap = "no-wrap";
  };

  const addHRStyle = (hrElement) => {
    hrElement.style.height = "2px";
    hrElement.style.width = "100px";
    hrElement.style.background = customColor.yellow;
    hrElement.style.border = "none";
    hrElement.style.marginBottom = "15px";
  };

  /* Helpers  */
  const handleWhiteSpaces = (string) => string.replace(/ /g, "-");

  const getNodeParents = (element) => {
    let nodes = [];
    nodes.push(element);
    while (element.parentNode) {
      nodes.unshift(element.parentNode);
      element = element.parentNode;
    }

    return nodes;
  };

  const isOverlayTarget = (overlay, event) =>
    getNodeParents(event.target).includes(overlay);

  /* DOM Manipulation #Event  */
  const handleToggleOverlayVisibility = (image, overlay) => {
    document.body.addEventListener("click", (e) => {
      if (isOverlayTarget(overlay, e)) return;
      e.stopPropagation();
      e.preventDefault();
      overlay.remove();
    });
  };

  const handleAltTagChange = (input, image, tagName, titleText, altTag) =>
    input.addEventListener("input", (e) => {
      const newAlt = handleWhiteSpaces(e.target.value);
      image.setAttribute("alt", newAlt);
      tagName.innerHTML = newAlt;
      handleTitleText(titleText, newAlt);
    });

  const handleImageClick = (image) => {
    image.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      createImageOverlay(image);
    });
  };

  /* DOM Manipulation */
  const changeImageAlt = (element, word) => element.setAttribute("alt", word);

  const getTitleInnerHTML = (altTag) =>
    `&ltimg alt="<span data-id=${altTag}>${altTag}</span>" &gt`;

  const handleTitleText = (titleText, altTag) => {
    titleText.innerHTML = getTitleInnerHTML(altTag);
    titleText.style.whiteSpace = "nowrap";
    addSpanStyle(altTag);
  };

  const getImageElements = () =>
    Array.from(document.getElementsByTagName("img")) ?? [];

  const setAltTagDisplay = (altTag, tagName, titleText, infoText) => {
    tagName.innerHTML = altTag;
    titleText.innerHTML = getTitleInnerHTML(altTag);
    infoText.innerHTML = "Type the new tag name bellow";
  };

  const createImageOverlay = (image) => {
    const altTag = image.getAttribute("alt");
    const overlay = document.createElement("div");
    const imgWrapper = document.createElement("figure");
    const titleText = document.createElement("div");
    const tagName = document.createElement("span");
    const hrElement = document.createElement("hr");
    const infoText = document.createElement("div");
    const altInput = document.createElement("input");
    const innerDiv = document.createElement("div");

    image.parentNode.insertBefore(imgWrapper, image);
    imgWrapper.appendChild(image);
    imgWrapper.appendChild(overlay);
    overlay.appendChild(innerDiv);
    const contentArray = [titleText, tagName, hrElement, infoText, altInput];
    contentArray.forEach((el) => innerDiv.appendChild(el));
    setAltTagDisplay(altTag, tagName, titleText, infoText);

    addImageWrapperStyle(imgWrapper, image);
    addImageOverlayStyle(overlay, image);
    addInnerDivStyle(innerDiv);
    addAltInputStyle(altInput);
    addHRStyle(hrElement);
    addTagNameStyle(tagName);
    addSpanStyle(altTag);

    handleAltTagChange(altInput, image, tagName, titleText, altTag);
    handleToggleOverlayVisibility(image, overlay);
  };

  const makeMagic = async (element) => {
    if (!element) return;
    await changeImageAltTagToRandomWord(element);
    addImageStyle(element);
    handleImageClick(element);
  };

  const makeMagicForAll = (elements) => {
    if (!elements.length) return;
    elements.forEach((element) => makeMagic(element));
  };

  /* New Images observer */
  // NOTE* I am keeping for loop because of better performance for  multiple nodes added at once
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        const addedNodes = mutation.addedNodes;
        for (let i = 0; i < addedNodes.length; i++) {
          const addedNode = addedNodes[i];
          if (addedNode.nodeName === "IMG") {
            makeMagic(addedNode);
          }
        }
      }
    });
  });

  const images = getImageElements();
  makeMagicForAll(images);

  const observerConfig = { childList: true };
  observer.observe(document.querySelector("body"), observerConfig);
})();
