// this is a partially revealing module pattern - just a variation on what we've already done

const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch
    let userButtons = document.querySelectorAll('.u-link'),
        lightbox = document.querySelector('.lightbox');

        function renderSocialMedia(socialMedia) {
            return `<ul class="u-social">
                ${socialMedia.map(item => `<li>${item}</li>`).join('')}
            </ul>`
        }

        function parseUserData(person) { // person is the databaase result
            let targetDiv = document.querySelector('.lb-content'),
                targetImg = lightbox.querySelector('img');

                let bioContent = `
                <p>${person.bio}</p>
                <h4>Social Media: </h4>
                ${renderSocialMedia(person.social)}
                `;

            console.log(bioContent);

            targetDiv.innerHTML = bioContent;
            targetImg.src = person.imgsrc;

            lightbox.classList.add('show-lb');


        }

        function getUserData(event) {
            event.preventDefault(); //kill default tag in behaviour (dont navigate anywhere)
           // debugger;
            
            let url = `/users/${this.getAttribute('href')}`; // /1
            let imgSrc = this.previousElementSibling.getAttribute('src');

            fetch(url) // go get data
                .then(res => res.json()) // parse the json into a plain object
                .then(data => {
                    console.log("my database result is:", data)

                    data[0].imgsrc = imgSrc;

                    parseUserData(data[0]);
                })
                .catch((err) => {
                    console.log(err)
                })}

        userButtons.forEach(button => button.addEventListener('click', getUserData));

        lightbox.querySelector('.close').addEventListener('click', function() {
            lightbox.classList.remove('show-lb');

        });

})();