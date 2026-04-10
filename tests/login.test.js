import 'dotenv/config'
// import {exec} from 'child_process'
// import util from 'util'

// const execAsync = util.promisify(exec)

const TestLogin = async()=>{
    try{
    const url = `${process.env.BASE_URL}/api/${process.env.API_VERSION}/users/login`

    const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: process.env.TEST_USERNAME,
                password: process.env.TEST_PASSWORD
            })
    })
   const response = await res.json()
   if (!res.ok) {
            throw new Error(`Status ${res.status}: ${JSON.stringify(response)}`)
        }
        console.log('Login test passed!', response.message)
    } catch (err) {
        console.error('Login test failed:', err.message)
        process.exit(1)
    }
}

TestLogin()
