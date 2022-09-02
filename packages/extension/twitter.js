
function findElement(iteration) {
    if (iteration < 10) {
        const rootName = document.querySelector("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(2) > div > div > div > div > div.css-1dbjc4n.r-6gpygo.r-14gqq1x > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2 > div > div > div > span")
        if (rootName) {

            const iFrame = document.createElement("iframe");
            iFrame.src = chrome.runtime.getURL("frame.html");

            const childDiv = document.createElement('div')
            const contentDiv = document.createElement('div')
            const childButton = document.createElement('button');

            childButton.innerText = "test";
            console.log(iFrame);

            contentDiv.appendChild(iFrame)

            childDiv.appendChild(contentDiv);
            childDiv.appendChild(childButton);



            rootName.appendChild(
                childDiv
            );
        } else {
            setTimeout(() => {
                findElement(iteration + 1)
            }, 300)
        }
    }
}

findElement(0);
