class Memoization {
    constructor () {
        this.myHashMap = new Map()
        this.simulateDelay = time => new Promise(resolve => setTimeout(resolve, time))
    }
    
    async expensiveFunction(parameter) {
        if(this.myHashMap.has(parameter)) {
            console.log('Instant response !')
            return this.myHashMap.get(parameter)
        }
    
        console.log('First time, long process...')
        await this.simulateDelay(1000)
        
        const result = `${parameter}-memoized`
    
        this.myHashMap.set(parameter, result)
    
        return result
    }

    async doStuff(){
        await this.expensiveFunction('superToto') // First time, long process...
        await this.expensiveFunction('superToto') // Instant response !
        await this.expensiveFunction('superToto') // Instant response !
        await this.expensiveFunction('superTata') // First time, long process...
        await this.expensiveFunction('superTata') // Instant response !
        await this.expensiveFunction('superToto') // Instant response !
    }
}

new Memoization().doStuff()