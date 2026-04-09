import 'dotenv/config'
import {exec} from 'child_process'
import util from 'util'

const execAsync = util.promisify(exec)

const TestLogin = async()=>{
    try{const command = `
    curl --location '${process.env.BASE_URL}/users/login' \
    -H 'Content-Type: application/json' \
    -d '{
        "username" : "${process.env.TEST_USERNAME}",
        "password": "${process.env.TEST_PASSWORD}"
    }'`
     const { stdout, stderr } = await execAsync(command)
     if (stderr) {
      throw new Error(`Curl error: ${stderr}`)
    }

    const response = JSON.parse(stdout)
    console.log('Login test passed!', response)}
    catch(err){
         console.error('Login test failed:', err.message)
         process.exit(1)
    }
}

TestLogin()
