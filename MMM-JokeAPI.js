Module.register("MMM-JokeAPI", {
    defaults: {
        fetchInterval: 10 * 1000
    }, 
    getStyles() {
        return [
            this.file('style.css')
        ]
    },
    joke: null,
    notificationReceived(notification, payload, sender) {
        if (notification === 'MODULE_DOM_CREATED') {
            this.getJoke();
            setInterval(() => {
                this.getJoke()
            }, this.config.fetchInterval);
        }
    },
    getDom() {
        const wrapper = document.createElement("div");

        if(this.joke === null) return wrapper;

        this.setupHTMLStructure(wrapper);

        return wrapper;
    },
    setupHTMLStructure(wrapper) {
        if (this.joke.type === 'single') {

            const joke = document.createElement("h1");
            joke.className = "bright medium light fadeInJoke";
            joke.innerHTML = this.joke.joke;
            wrapper.appendChild(joke);

        } else if (this.joke.type === 'twopart') {

            const setup = document.createElement("h1");
            setup.className = "bright medium light no-wrap fadeInJoke";
            setup.innerHTML = this.joke.joke;
            wrapper.appendChild(joke);

            /*const punchline = document.createElement("h2");
            punchline.className = "bright small light fadeInPunchline";
            punchline.innerHTML = this.joke.delivery;
            wrapper.appendChild(punchline);*/
        }
    },
    getJoke() {
        fetch(`https://icanhazdadjoke.com/`, {
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            response.json().then((joke) => {
                this.joke = joke;
                this.updateDom();
            });
        });
    }
});
