
export class TestingController {


    // callabak : used to implement asyncorunes tasks (task by task) when finished the first one will implement the second one
    // promsie  : the same of callback but clearly code (but still ugly)
    //  Async   : special syntax to work with promises (Asynchronous function) but the syntax like (Synchronous function) and async like promise.all()






    // ///////////////////////////////////////////////////////////////////////////////////////
    // callback 
    setByCallback(string, callback) {
        setTimeout(
            () => {
                console.log(string)
                callback()
            },
            Math.floor(Math.random() * 8000) + 1
        )
    }


    getByCallback(): any {
        this.setByCallback("callback A", () => {
            this.setByCallback("callback B", () => {
                this.setByCallback("callback C", () => {
                    this.setByCallback("callback D", () => {
                        this.setByCallback("callback E", () => {

                        })
                    })
                })
            })
        })
    }


    /////////////////////////////////////////////////////////////////////////////////////////
    // promise

    setByPromise(string) {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    console.log(string)
                    resolve(string)
                },
                Math.floor(Math.random() * 8000) + 1
            )
        })
    }


    getByPromise(): any {
        this.setByPromise("Promise A")
            .then(() => this.setByPromise("Promise B"))
            .then(() => this.setByPromise("Promise c"))
            .then(() => this.setByPromise("Promise d"))
            .then(() => this.setByPromise("Promise e"))
    }

    /////////////////////////////////////////////////////////////////////////////////////////
    // Aysnc Await



    setByAsync(string) {
        setTimeout(
            () => {
                console.log(string)
            },
            Math.floor(Math.random() * 8000) + 1
        )
    }

    async  getByAsync() {
        await this.setByAsync("Async A")
        await this.setByAsync("Async B")
        await this.setByAsync("Async C")
        await this.setByAsync("Async d")
        await this.setByAsync("Async e")
        await this.setByAsync("Async f")
    }


}


